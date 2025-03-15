const Collaboration = require('../models/collaboration');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

exports.createSession = async (req, res) => {
    try {
        const { type, title, description, settings } = req.body;
        
        const session = new Collaboration({
            sessionId: uuidv4(),
            type,
            participants: [{
                userId: req.user.id,
                role: 'host'
            }],
            content: {
                title,
                description,
                messages: [],
                resources: []
            },
            settings: {
                ...settings,
                maxParticipants: settings?.maxParticipants || 10,
                isPrivate: settings?.isPrivate || false,
                allowObservers: settings?.allowObservers || true,
                recordSession: settings?.recordSession || false
            },
            metrics: {
                duration: 0,
                participantCount: 1,
                messageCount: 0,
                resourcesShared: 0
            }
        });

        await session.save();
        res.json(session);
    } catch (err) {
        console.error('Error creating collaboration session:', err);
        res.status(500).send('Server Error');
    }
};

exports.joinSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { role } = req.body;

        const session = await Collaboration.findOne({ sessionId });
        
        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        if (session.participants.length >= session.settings.maxParticipants) {
            return res.status(400).json({ msg: 'Session is full' });
        }

        if (session.status !== 'active') {
            return res.status(400).json({ msg: 'Session is no longer active' });
        }

        // Add participant
        session.participants.push({
            userId: req.user.id,
            role: role || 'participant',
            joinedAt: Date.now(),
            activeStatus: 'active'
        });

        session.metrics.participantCount = session.participants.length;
        await session.save();

        res.json(session);
    } catch (err) {
        console.error('Error joining session:', err);
        res.status(500).send('Server Error');
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { content, type } = req.body;

        const session = await Collaboration.findOne({ sessionId });
        
        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        session.content.messages.push({
            senderId: req.user.id,
            content,
            timestamp: Date.now(),
            type: type || 'text'
        });

        session.metrics.messageCount++;
        await session.save();

        res.json(session.content.messages[session.content.messages.length - 1]);
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).send('Server Error');
    }
};

exports.updateSharedCode = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { language, content } = req.body;

        const session = await Collaboration.findOne({ sessionId });
        
        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        session.content.sharedCode = {
            language,
            content,
            lastEditor: req.user.id,
            version: (session.content.sharedCode?.version || 0) + 1
        };

        await session.save();
        res.json(session.content.sharedCode);
    } catch (err) {
        console.error('Error updating shared code:', err);
        res.status(500).send('Server Error');
    }
};

exports.endSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await Collaboration.findOne({ sessionId });
        
        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        // Only host can end session
        const isHost = session.participants.some(p => 
            p.userId.toString() === req.user.id && p.role === 'host'
        );

        if (!isHost) {
            return res.status(403).json({ msg: 'Only host can end session' });
        }

        session.status = 'ended';
        session.endedAt = Date.now();
        session.metrics.duration = (session.endedAt - session.createdAt) / 1000; // in seconds

        await session.save();
        res.json(session);
    } catch (err) {
        console.error('Error ending session:', err);
        res.status(500).send('Server Error');
    }
};