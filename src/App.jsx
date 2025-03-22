import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Moon, Sun, AlertCircle, BarChart2, TrendingUp, Award, Activity } from 'lucide-react';

const teamColors = {
  "Mumbai Indians": "#004BA0",
  "Chennai Super Kings": "#FFFF00",
  "Royal Challengers Bangalore": "#EC1C24",
  "Kolkata Knight Riders": "#3A225D",
  "Delhi Capitals": "#00008B",
  "Punjab Kings": "#ED1C24",
  "Rajasthan Royals": "#FF1493",
  "Sunrisers Hyderabad": "#FF822A",
  "Gujarat Titans": "#1034A6",
  "Lucknow Super Giants": "#A0E6FF"
};

// Sample historical data for predictions
const sampleMatchData = {
  currentInnings: 1,
  currentOver: 8.2,
  totalOvers: 20,
  battingTeam: "Mumbai Indians",
  bowlingTeam: "Chennai Super Kings",
  currentScore: 72,
  wickets: 2,
  recentPerformance: [6, 4, 1, 0, 2, 1, 4],
  venue: "Wankhede Stadium",
  pitchCondition: "Batting friendly",
  weather: "Clear",
  matchType: "League",
  powerPlayScore: 48,
  teamForm: "WWLWL"
};

// Mock probability data
const mockProbabilityData = [
  { over: 1, battingTeam: 46, bowlingTeam: 54 },
  { over: 2, battingTeam: 48, bowlingTeam: 52 },
  { over: 3, battingTeam: 42, bowlingTeam: 58 },
  { over: 4, battingTeam: 45, bowlingTeam: 55 },
  { over: 5, battingTeam: 51, bowlingTeam: 49 },
  { over: 6, battingTeam: 53, bowlingTeam: 47 },
  { over: 7, battingTeam: 55, bowlingTeam: 45 },
  { over: 8, battingTeam: 58, bowlingTeam: 42 },
  { over: 9, battingTeam: 61, bowlingTeam: 39 },
];

const teams = [
  "Mumbai Indians",
  "Chennai Super Kings",
  "Royal Challengers Bangalore",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants"
];

const venues = [
  "Wankhede Stadium",
  "M. A. Chidambaram Stadium",
  "Eden Gardens",
  "Arun Jaitley Stadium",
  "Narendra Modi Stadium",
  "Rajiv Gandhi International Cricket Stadium",
  "M. Chinnaswamy Stadium",
  "Punjab Cricket Association Stadium",
  "Sawai Mansingh Stadium",
  "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium"
];

const IPLScorePredictor = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [battingTeam, setBattingTeam] = useState(sampleMatchData.battingTeam);
  const [bowlingTeam, setBowlingTeam] = useState(sampleMatchData.bowlingTeam);
  const [venue, setVenue] = useState(sampleMatchData.venue);
  const [currentInnings, setCurrentInnings] = useState(sampleMatchData.currentInnings);
  const [currentOver, setCurrentOver] = useState(sampleMatchData.currentOver);
  const [currentScore, setCurrentScore] = useState(sampleMatchData.currentScore);
  const [wickets, setWickets] = useState(sampleMatchData.wickets);
  const [prediction, setPrediction] = useState({ score: 176, wickets: 6, winProbability: 58 });
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [probabilities, setProbabilities] = useState(mockProbabilityData);

  useEffect(() => {
    // Simulate prediction calculation when inputs change
    const calculatePrediction = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Simple prediction logic (this would be replaced by actual ML model)
        const predictedScore = Math.round(currentScore * (20 / currentOver) * (0.95 - (wickets * 0.03)));
        const predictedWickets = Math.min(10, Math.round(wickets + (wickets * (20 - currentOver) / currentOver)));
        const probability = Math.round(40 + Math.random() * 30);
        
        setPrediction({
          score: predictedScore,
          wickets: predictedWickets,
          winProbability: probability
        });
        
        setLoading(false);
        
        // Random chance of celebrating an upset
        if (Math.random() < 0.1) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }, 800);
    };
    
    calculatePrediction();
  }, [currentScore, currentOver, wickets, battingTeam, bowlingTeam]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const runRateData = [
    { over: 1, runRate: 7.0 },
    { over: 2, runRate: 8.5 },
    { over: 3, runRate: 6.5 },
    { over: 4, runRate: 7.8 },
    { over: 5, runRate: 9.2 },
    { over: 6, runRate: 8.8 },
    { over: 7, runRate: 8.0 },
    { over: 8, runRate: 7.4 },
    { over: currentOver, runRate: currentScore / currentOver }
  ];
  
  const wicketData = [
    { over: 2, wickets: 1 },
    { over: 6, wickets: 2 },
  ];
  
  const recentRunsData = sampleMatchData.recentPerformance.map((runs, index) => {
    return { ball: index + 1, runs };
  });

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="mr-2" size={24} />
          <h1 className="text-xl font-bold">IPL Score Predictor AI</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>
      
      <main className="container mx-auto p-4">
        {/* Teams Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Batting Team</label>
            <select
              value={battingTeam}
              onChange={(e) => setBattingTeam(e.target.value)}
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Bowling Team</label>
            <select
              value={bowlingTeam}
              onChange={(e) => setBowlingTeam(e.target.value)}
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Venue</label>
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              {venues.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Current Match Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Current Score</label>
            <div className="flex space-x-4">
              <input
                type="number"
                value={currentScore}
                onChange={(e) => setCurrentScore(Number(e.target.value))}
                className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                min="0"
              />
              <span className="flex items-center">/</span>
              <input
                type="number"
                value={wickets}
                onChange={(e) => setWickets(Number(e.target.value))}
                className={`w-1/4 p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                min="0"
                max="10"
              />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Current Over</label>
            <input
              type="number"
              value={currentOver}
              onChange={(e) => setCurrentOver(Number(e.target.value))}
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              min="0"
              max="20"
              step="0.1"
            />
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <label className="block text-sm font-medium mb-2">Innings</label>
            <select
              value={currentInnings}
              onChange={(e) => setCurrentInnings(Number(e.target.value))}
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value={1}>1st Innings</option>
              <option value={2}>2nd Innings</option>
            </select>
          </div>
        </div>
        
        {/* Prediction Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`col-span-1 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-all duration-500 transform ${loading ? 'animate-pulse' : ''}`}>
            <h3 className="font-semibold mb-4 flex items-center">
              <Award className="mr-2" size={18} />
              Predicted Score
            </h3>
            <div className="text-4xl font-bold text-center py-6 flex items-center justify-center">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              ) : (
                <span>{prediction.score}/{prediction.wickets}</span>
              )}
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {loading ? "Calculating..." : `Run Rate: ${(prediction.score/20).toFixed(2)}`}
            </div>
          </div>
          
          <div className={`col-span-2 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="font-semibold mb-4 flex items-center">
              <Activity className="mr-2" size={18} />
              Win Probability
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: battingTeam, value: prediction.winProbability },
                      { name: bowlingTeam, value: 100 - prediction.winProbability }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: battingTeam, value: prediction.winProbability },
                      { name: bowlingTeam, value: 100 - prediction.winProbability }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? teamColors[battingTeam] || COLORS[0] : teamColors[bowlingTeam] || COLORS[1]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Probability Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2" size={18} />
              Win Probability Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={probabilities}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                  <XAxis dataKey="over" stroke={darkMode ? "#aaa" : "#666"} />
                  <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      borderColor: darkMode ? '#555' : '#ddd',
                      color: darkMode ? '#fff' : '#333'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="battingTeam" 
                    name={battingTeam}
                    stackId="1" 
                    stroke={teamColors[battingTeam] || "#8884d8"} 
                    fill={teamColors[battingTeam] || "#8884d8"} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bowlingTeam" 
                    name={bowlingTeam}
                    stackId="1" 
                    stroke={teamColors[bowlingTeam] || "#82ca9d"} 
                    fill={teamColors[bowlingTeam] || "#82ca9d"} 
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2" size={18} />
              Run Rate Analysis
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={runRateData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                  <XAxis dataKey="over" stroke={darkMode ? "#aaa" : "#666"} />
                  <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      borderColor: darkMode ? '#555' : '#ddd',
                      color: darkMode ? '#fff' : '#333'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="runRate" 
                    stroke="#ff7300" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recent Runs and Wickets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="font-semibold mb-4">Recent Runs</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recentRunsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                  <XAxis dataKey="ball" stroke={darkMode ? "#aaa" : "#666"} />
                  <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      borderColor: darkMode ? '#555' : '#ddd',
                      color: darkMode ? '#fff' : '#333'
                    }} 
                  />
                  <Bar dataKey="runs" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="font-semibold mb-4">Team Form Analysis</h3>
            <div className="p-4">
              
              <div className="flex items-center mb-4">
                <div className="w-16 font-medium">Venue:</div>
                <div>{venue}</div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-16 font-medium">Pitch:</div>
                <div>{sampleMatchData.pitchCondition}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 font-medium">Weather:</div>
                <div className="flex items-center ml-5">
                  <span>{sampleMatchData.weather}</span>
                  {sampleMatchData.weather === "Clear" && (
                    <Sun size={16} className="ml-2 text-yellow-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Insights and Tips */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
          <h3 className="font-semibold mb-4 flex items-center">
            <AlertCircle className="mr-2" size={18} />
            AI Insights
          </h3>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="mb-2">
              Based on our AI analysis, {battingTeam} is predicted to score {prediction.score} runs with {prediction.wickets} wickets down.
            </p>
            <p className="mb-2">
              {battingTeam} has a {prediction.winProbability}% chance of winning based on current performance, historical data, and pitch conditions.
            </p>
            <p>
              Key factor: {venue} historically favors {
                prediction.winProbability > 50 ? battingTeam : bowlingTeam
              } with similar conditions.
            </p>
          </div>
        </div>
      </main>
      
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-2 h-10 bg-yellow-500 animate-fall1"></div>
          <div className="absolute top-0 left-1/3 w-2 h-6 bg-red-500 animate-fall2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-8 bg-blue-500 animate-fall3"></div>
          <div className="absolute top-0 left-2/3 w-2 h-12 bg-green-500 animate-fall4"></div>
          <div className="absolute top-0 left-3/4 w-2 h-7 bg-purple-500 animate-fall5"></div>
        </div>
      )}
      
      <footer className={`p-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
        IPL Score Predictor AI - Powered by Machine Learning
      </footer>
      
      <style jsx>{`
        @keyframes fall1 {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 100px)) rotate(540deg); }
        }
        @keyframes fall2 {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 100px)) rotate(-360deg); }
        }
        @keyframes fall3 {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 100px)) rotate(450deg); }
        }
        @keyframes fall4 {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 100px)) rotate(-720deg); }
        }
        @keyframes fall5 {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 100px)) rotate(630deg); }
        }
        .animate-fall1 { animation: fall1 3s linear infinite; }
        .animate-fall2 { animation: fall2 4s linear infinite; animation-delay: 0.5s; }
        .animate-fall3 { animation: fall3 3.5s linear infinite; animation-delay: 1s; }
        .animate-fall4 { animation: fall4 5s linear infinite; animation-delay: 1.5s; }
        .animate-fall5 { animation: fall5 4.5s linear infinite; animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default IPLScorePredictor;