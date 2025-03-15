import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Flex, Grid, Text, Heading,
  Card, CardHeader, CardBody, Button,
  Progress, SimpleGrid, Badge, IconButton,
  Table, Thead, Tbody, Tr, Th, Td,
  Stat, StatLabel, StatNumber, StatHelpText,
  StatArrow, Tooltip, Menu, MenuButton,
  MenuList, MenuItem, Tabs, TabList,
  Tab, TabPanels, TabPanel, useDisclosure,
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import {
  LineChart, BarChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, BarChart2, DollarSign, Users,
  Target, AlertCircle, ChevronDown, Filter,
  Download, Zap, Calendar, FileText
} from 'lucide-react';

// Real-time data simulation
const fetchRealtimeData = async () => {
  return {
    revenue: Math.floor(Math.random() * 100000) + 900000,
    deals: Math.floor(Math.random() * 10) + 30,
    conversion: Math.floor(Math.random() * 10) + 85,
    pipeline: Math.floor(Math.random() * 500000) + 1500000
  };
};

const RevenueMetrics = ({ data }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
    <Card>
      <CardBody>
        <Stack>
          <Flex justify="space-between" align="center">
            <Text color="gray.500">Revenue</Text>
            <DollarSign size={20} className="text-green-500" />
          </Flex>
          <Stat>
            <StatNumber fontSize="2xl">${data.revenue.toLocaleString()}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />23.36%
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Stack>
          <Flex justify="space-between" align="center">
            <Text color="gray.500">Deals Closed</Text>
            <Target size={20} className="text-blue-500" />
          </Flex>
          <Stat>
            <StatNumber fontSize="2xl">{data.deals}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />12.5%
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Stack>
          <Flex justify="space-between" align="center">
            <Text color="gray.500">Conversion Rate</Text>
            <TrendingUp size={20} className="text-purple-500" />
          </Flex>
          <Stat>
            <StatNumber fontSize="2xl">{data.conversion}%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />8.2%
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Stack>
          <Flex justify="space-between" align="center">
            <Text color="gray.500">Pipeline Value</Text>
            <BarChart2 size={20} className="text-orange-500" />
          </Flex>
          <Stat>
            <StatNumber fontSize="2xl">${data.pipeline.toLocaleString()}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />15.3%
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  </SimpleGrid>
);

const RevenueChart = ({ data }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Revenue Growth</Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} size="sm">
            Last 6 Months
          </MenuButton>
          <MenuList>
            <MenuItem>Last 3 Months</MenuItem>
            <MenuItem>Last 6 Months</MenuItem>
            <MenuItem>Last Year</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </CardHeader>
    <CardBody>
      <Box height="400px">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              stackId="1"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.3}
              name="Actual Revenue"
            />
            <Area
              type="monotone"
              dataKey="projected"
              stackId="1"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
              name="Projected Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CardBody>
  </Card>
);

const AIInsights = ({ insights }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">AI Insights</Heading>
        <IconButton
          icon={<Zap size={16} />}
          size="sm"
          colorScheme="purple"
          variant="ghost"
        />
      </Flex>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {insights.map((insight, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={2}>
                <Flex align="center" gap={2}>
                  {insight.icon}
                  <Text fontWeight="medium">{insight.title}</Text>
                </Flex>
                <Text fontSize="sm" color="gray.600">{insight.description}</Text>
                {insight.action && (
                  <Button size="sm" colorScheme="blue" variant="link">
                    Take Action
                  </Button>
                )}
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const EnterpriseAnalytics = () => {
  const [realtimeData, setRealtimeData] = useState({
    revenue: 1000000,
    deals: 35,
    conversion: 88,
    pipeline: 1800000
  });

  const [revenueData] = useState([
    { month: 'Jan', actual: 1200000, projected: 1100000 },
    { month: 'Feb', actual: 1350000, projected: 1250000 },
    { month: 'Mar', actual: 1500000, projected: 1400000 },
    { month: 'Apr', actual: 1800000, projected: 1600000 },
    { month: 'May', actual: 2100000, projected: 1800000 },
    { month: 'Jun', actual: 2400000, projected: 2000000 }
  ]);

  const [insights] = useState([
    {
      title: "Revenue Opportunity",
      description: "Based on current trends, focusing on enterprise clients could increase revenue by 28%",
      icon: <TrendingUp size={16} className="text-green-500" />,
      action: true
    },
    {
      title: "Team Performance",
      description: "Sales team efficiency has increased by 15% after completing the advanced training",
      icon: <Users size={16} className="text-blue-500" />,
      action: false
    },
    {
      title: "Risk Alert",
      description: "Customer churn risk detected in the SMB segment. Recommended actions available.",
      icon: <AlertCircle size={16} className="text-red-500" />,
      action: true
    }
  ]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchRealtimeData();
      setRealtimeData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack spacing={6} p={6}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <Stack>
          <Heading size="lg">Enterprise Analytics</Heading>
          <Text color="gray.600">Real-time business performance tracking</Text>
        </Stack>
        <Flex gap={4}>
          <Button leftIcon={<Filter size={16} />} variant="outline">
            Filter Data
          </Button>
          <Button leftIcon={<Download size={16} />} colorScheme="blue">
            Export Report
          </Button>
        </Flex>
      </Flex>

      <RevenueMetrics data={realtimeData} />

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <RevenueChart data={revenueData} />
        <AIInsights insights={insights} />
      </Grid>

      <Tabs>
        <TabList>
          <Tab>Performance</Tab>
          <Tab>Team Analytics</Tab>
          <Tab>Forecasts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Add detailed performance metrics */}
          </TabPanel>
          <TabPanel>
            {/* Add team performance analytics */}
          </TabPanel>
          <TabPanel>
            {/* Add forecast projections */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default EnterpriseAnalytics;