// RAG & AI Agent Design Patterns Explorer
class PatternExplorer {
    constructor() {
        this.currentView = 'technical'; // 'technical' or 'general'
        this.currentTab = 'rag'; // 'rag' or 'agent'
        this.selectedPatterns = new Set();
        this.searchQuery = '';
        this.complexityFilter = '';
        
        // Pattern data
        this.ragPatterns = [
            {
                "name": "Naive RAG",
                "complexity": "Beginner",
                "shortDesc": "Basic retrieval and generation using keyword matching",
                "detailedDesc": "The foundational approach where systems retrieve relevant chunks from a knowledge base and feed them directly to a language model. Uses simple keyword matching or basic semantic similarity.",
                "useCases": ["Simple Q&A systems", "Basic document search", "Knowledge base queries"],
                "pros": ["Simple to implement", "Low computational overhead", "Good for straightforward tasks"],
                "cons": ["Limited context understanding", "Poor with complex queries", "No iterative refinement"],
                "whenToUse": "When you need a simple, quick solution for basic question-answering tasks with well-structured documents.",
                "diagram": "Query → Retrieve → Generate → Response"
            },
            {
                "name": "Advanced RAG",
                "complexity": "Intermediate",
                "shortDesc": "Enhanced retrieval with query expansion and contextual refinement",
                "detailedDesc": "Incorporates sophisticated techniques including query expansion, iterative retrieval, and contextual refinement. Uses attention mechanisms and relevance scoring.",
                "useCases": ["Complex research tasks", "Multi-step reasoning", "Context-dependent queries"],
                "pros": ["Better accuracy", "Handles complex queries", "Contextual awareness"],
                "cons": ["Higher computational cost", "More complex implementation", "Requires fine-tuning"],
                "whenToUse": "When naive RAG isn't sufficient and you need better accuracy for complex, multi-step reasoning tasks.",
                "diagram": "Query → Expand → Retrieve → Refine → Generate → Response"
            },
            {
                "name": "Modular RAG",
                "complexity": "Advanced",
                "shortDesc": "Flexible architecture with interchangeable specialized modules",
                "detailedDesc": "Decomposes retrieval and generation into specialized, interchangeable modules. Enables customization at each stage from query expansion to generation.",
                "useCases": ["Custom enterprise solutions", "Domain-specific applications", "Research platforms"],
                "pros": ["Highly customizable", "Scalable", "Component optimization"],
                "cons": ["Complex architecture", "Integration challenges", "Higher development cost"],
                "whenToUse": "When you need maximum flexibility and have specific requirements that standard RAG can't meet.",
                "diagram": "Query → [Module 1] → [Module 2] → [Module N] → Response"
            },
            {
                "name": "Corrective RAG",
                "complexity": "Advanced",
                "shortDesc": "Real-time fact-checking with error detection and correction",
                "detailedDesc": "Functions as a real-time fact-checker, incorporating error-detection modules that identify and correct discrepancies before response delivery.",
                "useCases": ["Healthcare applications", "Financial services", "Legal research"],
                "pros": ["High accuracy", "Error prevention", "Reliability"],
                "cons": ["Computational overhead", "Complex implementation", "May slow responses"],
                "whenToUse": "In high-stakes domains where accuracy is paramount and errors could have serious consequences.",
                "diagram": "Query → Retrieve → Generate → Verify → Correct → Response"
            },
            {
                "name": "Speculative RAG",
                "complexity": "Advanced",
                "shortDesc": "Predictive retrieval that anticipates user needs",
                "detailedDesc": "Anticipates user needs by predicting queries and pre-fetching relevant information, significantly reducing response times through behavior pattern analysis.",
                "useCases": ["Interactive systems", "Real-time applications", "User experience optimization"],
                "pros": ["Faster responses", "Proactive information delivery", "Better UX"],
                "cons": ["Prediction accuracy challenges", "Resource intensive", "Privacy concerns"],
                "whenToUse": "When response time is critical and you have sufficient user behavior data to make accurate predictions.",
                "diagram": "Predict → Pre-fetch → [User Query] → Instant Response"
            },
            {
                "name": "Agentic RAG",
                "complexity": "Advanced",
                "shortDesc": "AI agents that dynamically plan and adapt retrieval strategies",
                "detailedDesc": "Extends traditional retrieval by allowing AI agents to plan retrievals, refine queries, and adapt responses dynamically based on intermediate results.",
                "useCases": ["Complex research tasks", "Adaptive systems", "Autonomous decision-making"],
                "pros": ["Dynamic adaptation", "Intelligent planning", "Continuous improvement"],
                "cons": ["High complexity", "Unpredictable behavior", "Difficult to debug"],
                "whenToUse": "When you need systems that can adapt and improve their retrieval strategies autonomously.",
                "diagram": "Query → Plan → Retrieve → Adapt → Re-plan → Response"
            },
            {
                "name": "GraphRAG",
                "complexity": "Advanced",
                "shortDesc": "Graph-based retrieval using relationship modeling",
                "detailedDesc": "Leverages graph structures to enhance retrieval through relationship modeling, utilizing knowledge graphs for more structured and interconnected information access.",
                "useCases": ["Knowledge management", "Complex data relationships", "Semantic search"],
                "pros": ["Relationship awareness", "Structured information", "Better context"],
                "cons": ["Complex graph construction", "Maintenance overhead", "Domain-specific"],
                "whenToUse": "When your data has rich relationships and you need to leverage connections between entities.",
                "diagram": "Query → Graph Traverse → Retrieve Nodes → Generate → Response"
            },
            {
                "name": "Multimodal RAG",
                "complexity": "Advanced",
                "shortDesc": "Handles diverse data types including text, images, and audio",
                "detailedDesc": "Handles diverse data types including text, images, audio, and video. Implements specialized patterns for processing different modalities.",
                "useCases": ["Multimedia content analysis", "Rich media search", "Cross-modal understanding"],
                "pros": ["Comprehensive data handling", "Rich interactions", "Versatile applications"],
                "cons": ["Complex processing", "High resource requirements", "Integration challenges"],
                "whenToUse": "When working with multimedia content that requires understanding across different data types.",
                "diagram": "Query → Multi-modal Retrieve → Cross-modal Fusion → Generate → Response"
            }
        ];

        this.agentPatterns = [
            {
                "name": "ReAct (Reasoning and Acting)",
                "complexity": "Beginner",
                "shortDesc": "Iterative cycle of reasoning and action-taking",
                "detailedDesc": "Implements an iterative cycle where agents alternate between reasoning about their current state and taking actions. Follows: analyze situation → execute action → observe results → repeat.",
                "useCases": ["Problem-solving tasks", "Dynamic environments", "Tool-using applications"],
                "pros": ["Logical progression", "Adaptable", "Transparent reasoning"],
                "cons": ["Can get stuck in loops", "May overthink simple tasks", "Performance depends on reasoning quality"],
                "whenToUse": "When you need agents that can think through problems step-by-step and adapt their actions based on results.",
                "diagram": "Think → Act → Observe → Think → Act → Observe..."
            },
            {
                "name": "Reflection Pattern",
                "complexity": "Intermediate",
                "shortDesc": "Self-improvement through metacognitive analysis",
                "detailedDesc": "Enhances agent capabilities through metacognitive processes where agents analyze their own outputs and iteratively improve responses through self-evaluation.",
                "useCases": ["Quality improvement", "Learning systems", "Error correction"],
                "pros": ["Self-improvement", "Quality enhancement", "Learning capability"],
                "cons": ["Computational overhead", "May overanalyze", "Risk of endless revision"],
                "whenToUse": "When response quality is crucial and you have computational resources for iterative improvement.",
                "diagram": "Generate → Reflect → Improve → Generate → Reflect..."
            },
            {
                "name": "Tool Use Pattern",
                "complexity": "Intermediate",
                "shortDesc": "Dynamic interaction with external systems and APIs",
                "detailedDesc": "Empowers agents to interact with external systems and services through well-defined interfaces. Agents dynamically select appropriate tools based on task requirements.",
                "useCases": ["API integration", "External service access", "System automation"],
                "pros": ["Extended capabilities", "Flexible tool selection", "Real-world integration"],
                "cons": ["Tool reliability dependency", "Security considerations", "Integration complexity"],
                "whenToUse": "When agents need to interact with external systems, databases, or APIs to complete their tasks.",
                "diagram": "Task → Select Tool → Use Tool → Process Result → Response"
            },
            {
                "name": "Planning Pattern",
                "complexity": "Advanced",
                "shortDesc": "Proactive strategy development before execution",
                "detailedDesc": "Enables agents to decompose complex goals into manageable subtasks before execution. Creates comprehensive roadmaps and adapts strategies based on changing circumstances.",
                "useCases": ["Complex project management", "Strategic planning", "Multi-step workflows"],
                "pros": ["Proactive approach", "Strategic thinking", "Obstacle anticipation"],
                "cons": ["Planning overhead", "May overplan", "Rigid execution"],
                "whenToUse": "For complex, multi-step tasks that benefit from upfront planning and strategic thinking.",
                "diagram": "Goal → Plan → Sub-tasks → Execute → Monitor → Adapt"
            },
            {
                "name": "Chain-of-Thought",
                "complexity": "Beginner",
                "shortDesc": "Step-by-step reasoning for complex problems",
                "detailedDesc": "Simulates human-like reasoning by breaking elaborate problems into sequential, logical steps. Guides models through structured problem-solving processes.",
                "useCases": ["Mathematical reasoning", "Logical analysis", "Multi-hop questions"],
                "pros": ["Improved reasoning", "Transparent process", "Better accuracy"],
                "cons": ["Longer responses", "May be verbose", "Not always necessary"],
                "whenToUse": "When dealing with complex problems that benefit from step-by-step reasoning and logical analysis.",
                "diagram": "Problem → Step 1 → Step 2 → Step 3 → ... → Solution"
            },
            {
                "name": "Orchestrator-Worker",
                "complexity": "Advanced",
                "shortDesc": "Centralized coordination with specialized workers",
                "detailedDesc": "Implements centralized coordination where a primary agent assigns tasks to specialized worker agents. Creates hierarchical structure with clear task delegation.",
                "useCases": ["Task delegation", "Specialized workflows", "Scalable systems"],
                "pros": ["Clear coordination", "Specialization", "Scalable"],
                "cons": ["Single point of failure", "Bottleneck risk", "Coordination overhead"],
                "whenToUse": "When you have well-defined tasks that can be efficiently distributed among specialized agents.",
                "diagram": "Orchestrator → Worker 1\n            → Worker 2\n            → Worker 3"
            },
            {
                "name": "Hierarchical Multi-Agent",
                "complexity": "Advanced",
                "shortDesc": "Tree-like organization with abstraction levels",
                "detailedDesc": "Organizes agents in tree-like structures with different levels of abstraction. Higher-level agents handle strategic decisions while lower-level agents execute specific tasks.",
                "useCases": ["Large-scale operations", "Complex organizations", "Strategic planning"],
                "pros": ["Clear command structure", "Efficient resource use", "Scalable"],
                "cons": ["Complex communication", "Rigid hierarchy", "Potential delays"],
                "whenToUse": "For large-scale operations that require clear command structures and multiple levels of decision-making.",
                "diagram": "Level 1: Strategic Agent\n  ↓\nLevel 2: Tactical Agents\n  ↓\nLevel 3: Operational Agents"
            },
            {
                "name": "Network-Based Communication",
                "complexity": "Advanced",
                "shortDesc": "Peer-to-peer agent interaction without central control",
                "detailedDesc": "Allows direct peer-to-peer interaction between agents without centralized control. Agents can communicate with any other agent and dynamically decide interaction patterns.",
                "useCases": ["Distributed systems", "Autonomous networks", "Emergent behavior"],
                "pros": ["No single point of failure", "Flexible communication", "Emergent capabilities"],
                "cons": ["Complex coordination", "Potential chaos", "Difficult to predict"],
                "whenToUse": "When you need flexible, distributed systems that can adapt without central coordination.",
                "diagram": "Agent A ↔ Agent B\n   ↕     ↕\nAgent C ↔ Agent D"
            },
            {
                "name": "Supervisor Pattern",
                "complexity": "Intermediate",
                "shortDesc": "Specialized coordination with workflow management",
                "detailedDesc": "Utilizes specialized coordination agents that manage communication and task distribution among multiple worker agents. Handles handoffs and maintains system state.",
                "useCases": ["Workflow management", "Task coordination", "System state management"],
                "pros": ["Clear coordination", "State management", "Workflow control"],
                "cons": ["Supervisor complexity", "Potential bottleneck", "Coordination overhead"],
                "whenToUse": "When you need clear workflow management and coordination between multiple specialized agents.",
                "diagram": "Supervisor → Worker 1\n         → Worker 2\n         → Worker 3\n(with state management)"
            }
        ];

        this.init();
    }

    init() {
        this.renderPatterns();
        this.updateViewToggle();
        this.bindEvents();
    }

    bindEvents() {
        // Tab switching
        document.getElementById('ragTab').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('rag');
        });
        document.getElementById('agentTab').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('agent');
        });

        // View toggle
        document.getElementById('technicalBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleView('technical');
        });
        document.getElementById('generalBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleView('general');
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter
        document.getElementById('complexityFilter').addEventListener('change', (e) => {
            this.handleFilter(e.target.value);
        });

        // Action buttons
        document.getElementById('compareBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showComparison();
        });
        document.getElementById('recommendBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRecommendations();
        });
        document.getElementById('clearBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.clearSelection();
        });

        // Modal close buttons
        document.getElementById('closeComparison').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('comparisonModal');
        });
        document.getElementById('closeDetail').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('detailModal');
        });
        document.getElementById('closeRecommend').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('recommendModal');
        });

        // Close modals on backdrop click
        document.getElementById('comparisonModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('comparisonModal')) {
                this.closeModal('comparisonModal');
            }
        });
        document.getElementById('detailModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('detailModal')) {
                this.closeModal('detailModal');
            }
        });
        document.getElementById('recommendModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('recommendModal')) {
                this.closeModal('recommendModal');
            }
        });

        // Recommendation options - bind after modal content is loaded
        this.bindRecommendationOptions();
    }

    bindRecommendationOptions() {
        document.querySelectorAll('.recommendation-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleRecommendation(e.target.dataset.usecase);
            });
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tab}Tab`).classList.add('active');
        
        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${tab}Section`).classList.add('active');
        
        // Clear selection when switching tabs
        this.clearSelection();
        
        // Re-render patterns for new tab
        this.renderPatterns();
    }

    toggleView(view) {
        this.currentView = view;
        this.updateViewToggle();
        this.renderPatterns();
    }

    updateViewToggle() {
        const technicalBtn = document.getElementById('technicalBtn');
        const generalBtn = document.getElementById('generalBtn');
        
        if (this.currentView === 'technical') {
            technicalBtn.classList.add('btn--primary');
            technicalBtn.classList.remove('btn--outline');
            generalBtn.classList.remove('btn--primary');
            generalBtn.classList.add('btn--outline');
        } else {
            generalBtn.classList.add('btn--primary');
            generalBtn.classList.remove('btn--outline');
            technicalBtn.classList.remove('btn--primary');
            technicalBtn.classList.add('btn--outline');
        }
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.filterPatterns();
    }

    handleFilter(complexity) {
        this.complexityFilter = complexity;
        this.filterPatterns();
    }

    filterPatterns() {
        const cards = document.querySelectorAll('.pattern-card');
        cards.forEach(card => {
            const name = card.querySelector('.pattern-name').textContent.toLowerCase();
            const desc = card.querySelector('.pattern-description').textContent.toLowerCase();
            const complexity = card.querySelector('.complexity-badge').textContent.toLowerCase();
            
            const matchesSearch = !this.searchQuery || name.includes(this.searchQuery) || desc.includes(this.searchQuery);
            const matchesFilter = !this.complexityFilter || complexity.includes(this.complexityFilter.toLowerCase());
            
            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    renderPatterns() {
        const patterns = this.currentTab === 'rag' ? this.ragPatterns : this.agentPatterns;
        const container = document.getElementById(`${this.currentTab}Grid`);
        
        container.innerHTML = patterns.map(pattern => this.createPatternCard(pattern)).join('');
        
        // Add event listeners to newly created pattern cards
        this.bindPatternCardEvents(container);
        
        // Apply current filters
        this.filterPatterns();
    }

    bindPatternCardEvents(container) {
        container.querySelectorAll('.pattern-card').forEach(card => {
            const patternName = card.querySelector('.pattern-name').textContent;
            
            // Card click (for detail view)
            card.addEventListener('click', (e) => {
                // Don't open detail if clicking on checkbox or learn more link
                if (!e.target.closest('.select-checkbox') && !e.target.closest('.learn-more')) {
                    this.showPatternDetail(patternName);
                }
            });
            
            // Checkbox click
            const checkbox = card.querySelector('.select-checkbox');
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePatternSelection(patternName, card);
            });
            
            // Learn more click
            const learnMore = card.querySelector('.learn-more');
            learnMore.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showPatternDetail(patternName);
            });
        });
    }

    createPatternCard(pattern) {
        const description = this.currentView === 'technical' ? pattern.detailedDesc : pattern.shortDesc;
        const isSelected = this.selectedPatterns.has(pattern.name);
        
        return `
            <div class="pattern-card ${isSelected ? 'selected' : ''}" data-pattern="${pattern.name}">
                <div class="pattern-card-header">
                    <h3 class="pattern-name">${pattern.name}</h3>
                    <span class="complexity-badge ${pattern.complexity.toLowerCase()}">${pattern.complexity}</span>
                </div>
                <p class="pattern-description">${description}</p>
                <div class="pattern-footer">
                    <div class="select-checkbox ${isSelected ? 'checked' : ''}"></div>
                    <a href="#" class="learn-more">Learn More</a>
                </div>
            </div>
        `;
    }

    togglePatternSelection(patternName, card) {
        if (this.selectedPatterns.has(patternName)) {
            this.selectedPatterns.delete(patternName);
            card.classList.remove('selected');
            card.querySelector('.select-checkbox').classList.remove('checked');
        } else {
            this.selectedPatterns.add(patternName);
            card.classList.add('selected');
            card.querySelector('.select-checkbox').classList.add('checked');
        }
    }

    showPatternDetail(patternName) {
        const patterns = [...this.ragPatterns, ...this.agentPatterns];
        const pattern = patterns.find(p => p.name === patternName);
        
        if (!pattern) return;
        
        document.getElementById('detailTitle').textContent = pattern.name;
        document.getElementById('detailContent').innerHTML = `
            <div class="pattern-detail-section">
                <h3>Description</h3>
                <p>${pattern.detailedDesc}</p>
            </div>
            
            <div class="pattern-detail-section">
                <h3>Flow Diagram</h3>
                <div class="flow-diagram">${pattern.diagram}</div>
            </div>
            
            <div class="pattern-detail-section">
                <h3>Use Cases</h3>
                <ul>
                    ${pattern.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                </ul>
            </div>
            
            <div class="pattern-detail-section">
                <h3>Pros</h3>
                <ul>
                    ${pattern.pros.map(pro => `<li>✓ ${pro}</li>`).join('')}
                </ul>
            </div>
            
            <div class="pattern-detail-section">
                <h3>Cons</h3>
                <ul>
                    ${pattern.cons.map(con => `<li>✗ ${con}</li>`).join('')}
                </ul>
            </div>
            
            <div class="pattern-detail-section">
                <h3>When to Use</h3>
                <p>${pattern.whenToUse}</p>
            </div>
        `;
        
        this.openModal('detailModal');
    }

    showComparison() {
        if (this.selectedPatterns.size < 2) {
            alert('Please select at least 2 patterns to compare.');
            return;
        }
        
        const patterns = [...this.ragPatterns, ...this.agentPatterns];
        const selectedPatternData = Array.from(this.selectedPatterns).map(name => 
            patterns.find(p => p.name === name)
        );
        
        const comparisonContent = `
            <div class="comparison-grid">
                ${selectedPatternData.map(pattern => `
                    <div class="comparison-card">
                        <h3>${pattern.name}</h3>
                        <p><strong>Complexity:</strong> ${pattern.complexity}</p>
                        <p><strong>Description:</strong> ${pattern.shortDesc}</p>
                        <p><strong>Best For:</strong> ${pattern.useCases.join(', ')}</p>
                        <p><strong>Key Pros:</strong> ${pattern.pros.slice(0, 2).join(', ')}</p>
                        <p><strong>Key Cons:</strong> ${pattern.cons.slice(0, 2).join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.getElementById('comparisonContent').innerHTML = comparisonContent;
        this.openModal('comparisonModal');
    }

    showRecommendations() {
        this.openModal('recommendModal');
        // Re-bind events for recommendation options after modal is shown
        setTimeout(() => {
            this.bindRecommendationOptions();
        }, 100);
    }

    handleRecommendation(usecase) {
        // Clear previous selections
        document.querySelectorAll('.recommendation-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current option
        document.querySelector(`[data-usecase="${usecase}"]`).classList.add('selected');
        
        const recommendations = this.getRecommendations(usecase);
        const resultsDiv = document.getElementById('recommendationResults');
        
        resultsDiv.innerHTML = `
            <h3>Recommended Patterns for ${this.getUseCaseTitle(usecase)}</h3>
            ${recommendations.map(rec => `
                <div class="recommended-pattern">
                    <h4>${rec.name}</h4>
                    <p><strong>Why:</strong> ${rec.reason}</p>
                    <p><strong>Complexity:</strong> ${rec.complexity}</p>
                </div>
            `).join('')}
        `;
        
        resultsDiv.classList.add('active');
    }

    getUseCaseTitle(usecase) {
        const titles = {
            'qa': 'Simple Q&A System',
            'research': 'Research Platform',
            'automation': 'System Automation',
            'multimedia': 'Multimedia Content',
            'enterprise': 'Enterprise Solution'
        };
        return titles[usecase] || usecase;
    }

    getRecommendations(usecase) {
        const recommendations = {
            'qa': [
                { name: 'Naive RAG', reason: 'Simple and effective for basic Q&A tasks', complexity: 'Beginner' },
                { name: 'Chain-of-Thought', reason: 'Helps with step-by-step reasoning', complexity: 'Beginner' }
            ],
            'research': [
                { name: 'Advanced RAG', reason: 'Better accuracy for complex research queries', complexity: 'Intermediate' },
                { name: 'GraphRAG', reason: 'Excellent for exploring relationships in data', complexity: 'Advanced' },
                { name: 'Planning Pattern', reason: 'Helps structure complex research tasks', complexity: 'Advanced' }
            ],
            'automation': [
                { name: 'Tool Use Pattern', reason: 'Perfect for interacting with external systems', complexity: 'Intermediate' },
                { name: 'ReAct', reason: 'Great for reasoning and taking actions', complexity: 'Beginner' },
                { name: 'Orchestrator-Worker', reason: 'Efficient for delegating automated tasks', complexity: 'Advanced' }
            ],
            'multimedia': [
                { name: 'Multimodal RAG', reason: 'Designed specifically for multimedia content', complexity: 'Advanced' },
                { name: 'Modular RAG', reason: 'Flexible architecture for different media types', complexity: 'Advanced' }
            ],
            'enterprise': [
                { name: 'Modular RAG', reason: 'Highly customizable for enterprise needs', complexity: 'Advanced' },
                { name: 'Corrective RAG', reason: 'High accuracy for enterprise applications', complexity: 'Advanced' },
                { name: 'Hierarchical Multi-Agent', reason: 'Scalable for large organizations', complexity: 'Advanced' }
            ]
        };
        
        return recommendations[usecase] || [];
    }

    clearSelection() {
        this.selectedPatterns.clear();
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('.select-checkbox').classList.remove('checked');
        });
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PatternExplorer();
});