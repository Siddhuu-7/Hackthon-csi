import {
  Search,
  Code,
  Brain,
  Smartphone,
  Globe,
  Shield,
  Heart,
  Zap,
  Leaf,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react"
const ProblemCard = ({ problem, isExpanded, onToggle, index }) => {
  const iconMap = {
    "AI/ML": Brain,
    "Web Development": Globe,
    "Mobile App": Smartphone,
    Cybersecurity: Shield,
    Healthcare: Heart,
    IoT: Zap,
    Sustainability: Leaf,
    EdTech: BookOpen,
  }

  const Icon = iconMap[problem.category] || Code

  const difficultyColors = {
    Easy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    Hard: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  }

  const categoryColors = {
    "AI/ML": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Web Development": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Mobile App": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    Cybersecurity: "bg-red-500/20 text-red-300 border-red-500/30",
    Healthcare: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    IoT: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    Sustainability: "bg-green-500/20 text-green-300 border-green-500/30",
    EdTech: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  }

  return (
    <div
      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:bg-white/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header - Always Visible */}
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`p-3 ${categoryColors[problem.category]} rounded-xl border backdrop-blur-sm transition-transform duration-300 hover:scale-105`}
            >
              <Icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-medium text-gray-400">#{problem.id}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${difficultyColors[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${categoryColors[problem.category]}`}
                >
                  {problem.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 hover:text-teal-400 transition-colors">
                {problem.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{problem.description}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
            {isExpanded ? (
              <ChevronUp className="text-gray-300" size={20} />
            ) : (
              <ChevronDown className="text-gray-300" size={20} />
            )}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 ml-16">
          {problem.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/5 rounded-md text-sm text-gray-300 border border-white/10 hover:bg-teal-500/20 hover:border-teal-500/30 hover:text-teal-300 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6 animate-expandDown">
          {/* Requirements */}
          <div className="animate-fadeIn">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-teal-500 rounded"></span>
              Requirements
            </h4>
            <ul className="space-y-2 ml-6">
              {problem.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Deliverables */}
          <div className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded"></span>
              Expected Deliverables
            </h4>
            <ul className="space-y-2 ml-6">
              {problem.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                  <span className="text-emerald-400 text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-teal-500 rounded"></span>
              Suggested Technologies
            </h4>
            <div className="flex flex-wrap gap-2 ml-6">
              {problem.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/5 rounded-lg text-gray-300 font-medium border border-white/10 hover:bg-teal-500/20 hover:border-teal-500/30 hover:text-teal-300 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Points */}
          <div
            className="bg-gradient-to-br from-teal-500/20 to-pink-500/20 border border-teal-500/30 rounded-xl p-4 ml-6 hover:shadow-md hover:shadow-teal-500/20 transition-all duration-300 backdrop-blur-sm"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-semibold">Total Points</span>
              <span className="text-3xl font-bold text-teal-400">{problem.points}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProblemCard;
