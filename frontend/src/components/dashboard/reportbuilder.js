import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { Users, MessageSquare, Trophy, Star, Gift, Target, Brain } from 'lucide-react';

export const teamcollaboration = ({ team, projects, achievements }) => {
    const [activeProject, setActiveProject] = useState(null);
    
    // Project Workspace
    const ProjectWorkspace = ({ project }) => (
        <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => setActiveProject(project)}
                    >
                        View Details
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Team Members */}
                    <div className="flex items-center space-x-2">
                        {project.team.map((member, index) => (
                            <div 
                                key={index}
                                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                                title={member.name}
                            >
                                {member.initials}
                            </div>
                        ))}
                        <Button variant="ghost" size="sm">
                            <Users className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Quick Actions */}
                    <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                        </Button>
                        <Button variant="outline" size="sm">
                            Share Progress
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Team Chat
    const TeamChat = () => (
        <Card>
            <CardHeader>
                <CardTitle>Team Chat</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">
                {/* Chat messages would go here */}
            </CardContent>
        </Card>
    );

    // Knowledge Sharing
    const KnowledgeHub = () => (
        <Card>
            <CardHeader>
                <CardTitle>Knowledge Hub</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {team.knowledgeBase.map((item, index) => (
                        <div 
                            key={index}
                            className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all cursor-pointer"
                        >
                            <div className="flex items-start">
                                <Brain className="w-5 h-5 text-primary mr-3 mt-1" />
                                <div>
                                    <h4 className="font-medium">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                        <span>{item.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Peer Recognition
    const PeerRecognition = () => (
        <Card>
            <CardHeader>
                <CardTitle>Peer Recognition</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {team.recognitions.map((recognition, index) => (
                        <div 
                            key={index}
                            className="p-4 bg-primary/5 rounded-lg"
                        >
                            <div className="flex items-start">
                                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-medium">{recognition.from}</span>
                                        <span className="mx-2">→</span>
                                        <span className="font-medium">{recognition.to}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {recognition.message}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <Gift className="w-4 h-4 text-primary mr-1" />
                                        <span className="text-sm text-primary">
                                            +{recognition.points} points
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Team Achievements
    const TeamAchievements = () => (
        <Card>
            <CardHeader>
                <CardTitle>Team Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                        <div 
                            key={index}
                            className={`p-4 rounded-lg text-center ${
                                achievement.unlocked 
                                    ? 'bg-primary/10' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            <Trophy className={`w-8 h-8 mx-auto mb-2 ${
                                achievement.unlocked 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-400'
                            }`} />
                            <h4 className="font-medium">{achievement.name}</h4>
                            <p className="text-sm text-gray-600">
                                {achievement.description}
                            </p>
                            {!achievement.unlocked && (
                                <div className="mt-2">
                                    <Progress 
                                        value={achievement.progress} 
                                        className="h-1" 
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {achievement.progress}% Complete
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectWorkspace key={index} project={project} />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TeamChat />
                <KnowledgeHub />
            </div>

            <PeerRecognition />
            <TeamAchievements />
        </div>
    );
};

export default teamcollaboration;