import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { LineChart, BarChart, RadarChart, Radar, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis } from 'recharts';
import { Users, TrendingUp, Target, Brain, Building2, Network, FileBarChart } from 'lucide-react';

export const departmentanalytics = ({ departmentData, onExport }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [viewType, setViewType] = useState('overview');

    // Department Overview Card
    const DepartmentOverview = ({ department }) => (
        <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-lg">{department.name}</h3>
                        <p className="text-sm text-gray-600">{department.teamCount} Teams</p>
                    </div>
                    <Building2 className="w-6 h-6 text-primary" />
                </div>
                
                <div className="mt-4 space-y-3">
                    <div>
                        <div className="flex justify-between text-sm">
                            <span>Goal Progress</span>
                            <span>{department.goalProgress}%</span>
                        </div>
                        <Progress value={department.goalProgress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-2 bg-primary/5 rounded">
                            <div className="text-sm text-gray-600">Value Created</div>
                            <div className="font-bold">${department.valueCreated.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                            <div className="text-sm text-gray-600">Team Synergy</div>
                            <div className="font-bold">{department.teamSynergy}%</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Team Skill Map
    const TeamSkillMap = ({ teams }) => (
        <Card>
            <CardHeader>
                <CardTitle>Team Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={teams.skillDistribution}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <Radar 
                                name="Current Level" 
                                dataKey="current" 
                                stroke="#8884d8" 
                                fill="#8884d8" 
                                fillOpacity={0.6} 
                            />
                            <Radar 
                                name="Target Level" 
                                dataKey="target" 
                                stroke="#82ca9d" 
                                fill="#82ca9d" 
                                fillOpacity={0.6} 
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Cross-Team Projects
    const CrossTeamProjects = ({ projects }) => (
        <Card>
            <CardHeader>
                <CardTitle>Cross-Team Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <div key={index} className="p-4 bg-primary/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium">{project.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        {project.teams.join(', ')}
                                    </p>
                                </div>
                                <Network className="w-5 h-5 text-primary" />
                            </div>
                            <Progress value={project.progress} className="h-2 mb-2" />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{project.progress}% Complete</span>
                                <span>{project.timeRemaining} remaining</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Department Value Metrics
    const ValueMetrics = ({ metrics }) => (
        <Card>
            <CardHeader>
                <CardTitle>Value Creation By Team</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metrics.valueByTeam}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="team" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="directValue" name="Direct Value" fill="#8884d8" />
                            <Bar dataKey="indirectValue" name="Indirect Value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Resource Optimization
    const ResourceOptimization = ({ data }) => (
        <Card>
            <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.utilizationTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line 
                                    type="monotone" 
                                    dataKey="utilization" 
                                    stroke="#8884d8" 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                        {data.resourceMetrics.map((metric, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{metric.resource}</span>
                                    <span>{metric.efficiency}% Efficiency</span>
                                </div>
                                <Progress value={metric.efficiency} className="h-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Export Reports Button
    const ExportButton = ({ department }) => (
        <Button 
            onClick={() => onExport(department.id)}
            className="flex items-center"
        >
            <FileBarChart className="w-4 h-4 mr-2" />
            Export Report
        </Button>
    );

    return (
        <div className="space-y-6">
            {/* Department Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departmentData.departments.map((dept, index) => (
                    <DepartmentOverview 
                        key={index}
                        department={dept}
                        onClick={() => setSelectedDepartment(dept)}
                    />
                ))}
            </div>

            {selectedDepartment && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="space-x-2">
                            <Button
                                variant={viewType === 'overview' ? 'default' : 'outline'}
                                onClick={() => setViewType('overview')}
                            >
                                Overview
                            </Button>
                            <Button
                                variant={viewType === 'teams' ? 'default' : 'outline'}
                                onClick={() => setViewType('teams')}
                            >
                                Teams
                            </Button>
                            <Button
                                variant={viewType === 'projects' ? 'default' : 'outline'}
                                onClick={() => setViewType('projects')}
                            >
                                Projects
                            </Button>
                        </div>
                        <ExportButton department={selectedDepartment} />
                    </div>

                    {viewType === 'overview' && (
                        <>
                            <ValueMetrics metrics={selectedDepartment.metrics} />
                            <ResourceOptimization data={selectedDepartment.resources} />
                        </>
                    )}

                    {viewType === 'teams' && (
                        <TeamSkillMap teams={selectedDepartment.teams} />
                    )}

                    {viewType === 'projects' && (
                        <CrossTeamProjects projects={selectedDepartment.projects} />
                    )}
                </div>
            )}
        </div>
    );
};

export default departmentanalytics;