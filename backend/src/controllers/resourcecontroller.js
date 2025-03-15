const Resource = require('../models/resource');
const User = require('../models/user');

exports.createResource = async (req, res) => {
    try {
        const {
            title,
            type,
            format,
            content,
            skillLevel,
            tags,
            prerequisites,
            isPublic
        } = req.body;

        const resource = new Resource({
            title,
            type,
            format,
            content,
            metadata: {
                author: req.user.id,
                skillLevel,
                tags,
                prerequisites
            },
            accessibility: {
                isPublic
            }
        });

        await resource.save();
        res.json(resource);
    } catch (err) {
        console.error('Error creating resource:', err);
        res.status(500).send('Server Error');
    }
};

exports.getResources = async (req, res) => {
    try {
        const { 
            type,
            skillLevel,
            tags,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};
        if (type) query.type = type;
        if (skillLevel) query['metadata.skillLevel'] = skillLevel;
        if (tags) query['metadata.tags'] = { $in: tags.split(',') };

        const sortOptions = {};
        if (sort === 'newest') sortOptions['metadata.createDate'] = -1;
        if (sort === 'popular') sortOptions['engagement.views'] = -1;
        if (sort === 'rating') sortOptions['engagement.averageRating'] = -1;

        const resources = await Resource.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('metadata.author', 'name');

        const total = await Resource.countDocuments(query);

        res.json({
            resources,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error getting resources:', err);
        res.status(500).send('Server Error');
    }
};

exports.updateResource = async (req, res) => {
    try {
        const {
            title,
            content,
            skillLevel,
            tags,
            prerequisites,
            isPublic
        } = req.body;

        const resource = await Resource.findById(req.params.id);
        
        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        // Check ownership
        if (resource.metadata.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        // Create new version
        resource.versions.push({
            number: resource.versions.length + 1,
            changes: req.body.changes || 'Updated resource',
            date: Date.now(),
            author: req.user.id
        });

        // Update fields
        if (title) resource.title = title;
        if (content) resource.content = content;
        if (skillLevel) resource.metadata.skillLevel = skillLevel;
        if (tags) resource.metadata.tags = tags;
        if (prerequisites) resource.metadata.prerequisites = prerequisites;
        if (typeof isPublic !== 'undefined') resource.accessibility.isPublic = isPublic;

        resource.metadata.updateDate = Date.now();

        await resource.save();
        res.json(resource);
    } catch (err) {
        console.error('Error updating resource:', err);
        res.status(500).send('Server Error');
    }
};

exports.reviewResource = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        // Add review
        resource.quality.reviews.push({
            userId: req.user.id,
            rating,
            comment,
            date: Date.now()
        });

        // Update average rating
        const totalRatings = resource.quality.reviews.reduce((sum, review) => sum + review.rating, 0);
        resource.engagement.averageRating = totalRatings / resource.quality.reviews.length;

        await resource.save();
        res.json(resource);
    } catch (err) {
        console.error('Error reviewing resource:', err);
        res.status(500).send('Server Error');
    }
};

exports.trackEngagement = async (req, res) => {
    try {
        const { action } = req.body;
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        switch (action) {
            case 'view':
                resource.engagement.views++;
                break;
            case 'like':
                resource.engagement.likes++;
                break;
            case 'share':
                resource.engagement.shares++;
                break;
            case 'complete':
                resource.engagement.completions++;
                break;
        }

        await resource.save();
        res.json(resource.engagement);
    } catch (err) {
        console.error('Error tracking engagement:', err);
        res.status(500).send('Server Error');
    }
};