import React, { useState } from 'react';
import './Terminal.css';

interface Command {
  id: string;
  icon: string;
  label: string;
  command: string;
}

interface TerminalOutput {
  id: string;
  type: 'command' | 'response';
  content: string;
}

const AVAILABLE_COMMANDS: Command[] = [
  { id: 'about', icon: '👤', label: 'whoami', command: 'whoami' },
  { id: 'education', icon: '🎓', label: 'Education', command: 'cat education.txt' },
  { id: 'experience', icon: '💼', label: 'Experience', command: 'cat experience.txt' },
  { id: 'skills', icon: '🛠️', label: 'Skills', command: 'cat skills.txt' },
  { id: 'projects', icon: '💻', label: 'Projects', command: 'ls projects/' },
  { id: 'research', icon: '🔬', label: 'Research', command: 'cat research.txt' },
  { id: 'interests', icon: '⭐', label: 'Interests', command: 'cat interests.txt' },
  { id: 'clear', icon: '🧹', label: 'Clear', command: 'clear' }
];

const COMMAND_RESPONSES: Record<string, string> = {
  about: `Emmanuel Oppong
A dynamic young professional combining scientific inquiry and technological innovation.
Currently serving at FDA Accra while pursuing innovative tech projects.`,

  education: `Educational Background:
--------------------------------
🎓 BSc in Chemistry
   Kwame Nkrumah University of Science and Technology (KNUST)
   
📚 Specialization:
   - Computational Chemistry
   - Catalysis Studies
   
🔬 Final Year Project:
   Investigation of hydrous hydrazine decomposition
   on nickel catalyst with potassium hydroxide`,

  experience: `Professional Experience:
--------------------------------
🏢 Food and Drugs Authority (FDA), Accra
   - Drug Physicochemical Laboratory
   - Supply Chain Management
   - Technical Report Writing
   - Vendor Assessment
   - Procurement Compliance

💼 Entrepreneurial Ventures:
   1. ChaleCheck - Business Review Platform
   2. NextWave - Digital Platform for Artists
   3. Web Development Projects`,

  skills: `Technical & Professional Skills:
--------------------------------
🧪 Scientific:
   - Chemistry & Lab Analysis
   - Computational Research
   - Data Analysis
   - Technical Documentation

💻 Programming:
   - Python | React | Node.js
   - Web Development
   - AI/ML Implementation
   - Data Science

👔 Professional:
   - Project Management
   - Technical Writing
   - Team Leadership
   - Vendor Assessment`,

  projects: `Project Portfolio:
--------------------------------
📱 ChaleCheck
   Business review platform connecting customers
   with local businesses

🎵 NextWave
   Digital platform promoting underground artists

🌐 Leyec
   Modern web application with responsive design

📊 Research Projects
   - Hydrazine decomposition study
   - Computational chemistry analysis`,

  research: `Research Experience:
--------------------------------
🔬 Primary Research:
   - Hydrous Hydrazine Decomposition
   - Nickel Catalyst Studies
   - Computational Chemistry Models

📊 Focus Areas:
   - Catalysis Mechanisms
   - Computational Modeling
   - Chemical Kinetics
   - Data Analysis in Chemistry`,

  interests: `Areas of Interest:
--------------------------------
🔬 Scientific Computing
🤖 Artificial Intelligence
🧪 Environmental Chemistry
🧬 Bioinformatics
⚡ Tech Innovation
📊 Data Science
🌐 Web Development
🔗 Blockchain Technology`
};

const Terminal: React.FC = () => {
  const [outputs, setOutputs] = useState<TerminalOutput[]>([{
    id: '1',
    type: 'response',
    content: "Welcome to Emmanuel's Interactive Terminal! Click any command above to get started."
  }]);

  const handleCommand = (cmd: Command) => {
    if (cmd.id === 'clear') {
      setOutputs([]);
      return;
    }

    const newOutputs: TerminalOutput[] = [
      ...outputs,
      { id: Date.now().toString() + '-cmd', type: 'command', content: cmd.command },
      { id: Date.now().toString() + '-res', type: 'response', content: COMMAND_RESPONSES[cmd.id] }
    ];
    setOutputs(newOutputs);
  };

  return (
    <div className="terminal-page">
      <div className="main-container">
        <h2 className="section-title">
          <span className="terminal-icon">⌨️</span>
          Interactive Terminal
        </h2>
        
        <div className="terminal-wrapper">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <div className="terminal-button close"></div>
              <div className="terminal-button minimize"></div>
              <div className="terminal-button maximize"></div>
            </div>
            <div className="terminal-title">emmanuel@portfolio: ~/info</div>
          </div>
          
          <div className="terminal-content">
            {outputs.map((output) => (
              <div key={output.id} className={`output-line ${output.type}`}>
                {output.type === 'command' && <span className="prompt">$ </span>}
                {output.content}
              </div>
            ))}
          </div>
        </div>

        <div className="commands-section">
          <h3 className="commands-title">Available Commands</h3>
          <div className="commands-grid">
            {AVAILABLE_COMMANDS.map((cmd) => (
              <button
                key={cmd.id}
                className="command-button"
                onClick={() => handleCommand(cmd)}
              >
                <span className="command-icon">{cmd.icon}</span>
                <span className="command-label">{cmd.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
