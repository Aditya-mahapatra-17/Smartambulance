import { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  Navigation, 
  Activity, 
  Hospital, 
  Phone,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveDashboard } from "@/components/LiveDashboard";
import smartHospital from "@/assets/smart-hospital.jpg";
import aiTrafficSystem from "@/assets/ai-traffic-system.jpg";

const solutions = [
  {
    icon: Brain,
    title: "AI Traffic Management",
    subtitle: "Smart Path Clearing",
    description: "Smart traffic lights automatically clear the path when an ambulance is detected using computer vision and IoT sensors.",
    features: [
      "Real-time ambulance detection",
      "Automatic traffic light control",
      "Multi-intersection coordination",
      "Emergency vehicle priority"
    ],
    image: aiTrafficSystem,
    color: "medical-blue",
    delay: 0
  },
  {
    icon: Navigation,
    title: "GPS & Smart Routing",
    subtitle: "Optimal Path Intelligence",
    description: "AI-powered routing finds the fastest, least congested route in real-time, considering traffic patterns and road conditions.",
    features: [
      "Dynamic route optimization",
      "Traffic pattern analysis",
      "Road condition monitoring",
      "ETA prediction accuracy"
    ],
    image: null,
    color: "accent",
    delay: 200
  },
  {
    icon: Activity,
    title: "IoT Patient Monitoring",
    subtitle: "Live Vital Streaming",
    description: "Continuous monitoring of vital signs (HR, BP, O2) with real-time data streaming directly to receiving hospitals.",
    features: [
      "Real-time vital signs",
      "ECG monitoring",
      "Blood pressure tracking",
      "Oxygen saturation levels"
    ],
    image: null,
    color: "emergency-red",
    delay: 400
  },
  {
    icon: Hospital,
    title: "Hospital Auto-Alert",
    subtitle: "Instant Preparation",
    description: "Nearby hospitals receive automatic notifications with patient condition updates, enabling immediate preparation.",
    features: [
      "Automatic hospital selection",
      "Real-time patient data",
      "Resource allocation",
      "Staff notification system"
    ],
    image: smartHospital,
    color: "medical-blue",
    delay: 600
  },
  {
    icon: Phone,
    title: "AI Call Assistant",
    subtitle: "Intelligent Emergency Handling",
    description: "AI detects critical keywords and automatically triggers dispatch while providing first-aid guidance to callers.",
    features: [
      "Keyword detection",
      "Automatic dispatch",
      "First-aid guidance",
      "Multi-language support"
    ],
    image: null,
    color: "accent",
    delay: 800
  }
];

export const SolutionSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeItem, setActiveItem] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            solutions.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate active item for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % solutions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-blue/20 border border-medical-blue/30 rounded-full text-medical-blue mb-6 medical-glow">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">AI-POWERED SOLUTION</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-medical-blue">Revolutionary</span> Emergency Response
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive AI and IoT solution transforms every aspect of emergency response, 
            from detection to delivery.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isVisible = visibleItems.includes(index);
            const isActive = activeItem === index;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`transition-all duration-1000 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${solution.delay}ms` }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-reverse'}`}>
                  {/* Content */}
                  <div className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${solution.color}/20 transition-all duration-500 ${isActive ? `shadow-glow-medical bg-${solution.color}/30` : ''}`}>
                        <Icon className={`h-8 w-8 text-${solution.color} transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-foreground">
                          {solution.title}
                        </h3>
                        <p className={`text-lg font-semibold text-${solution.color}`}>
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className={`flex items-center gap-3 transition-all duration-500 ${
                            isActive ? 'translate-x-2' : ''
                          }`}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        >
                          <CheckCircle className={`h-5 w-5 text-${solution.color} flex-shrink-0`} />
                          <span className="text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`bg-gradient-${solution.color === 'medical-blue' ? 'medical' : 'emergency'} text-white border-0 group hover:shadow-glow-medical transition-all duration-300`}
                      size="lg"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Image/Visual */}
                  <div className={`${isEven ? '' : 'lg:order-1'} relative`}>
                    {solution.image ? (
                      <div className={`medical-card overflow-hidden transition-all duration-700 ${isActive ? 'shadow-glow-intense scale-105' : ''}`}>
                        <img 
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-80 object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${solution.color}/20 to-transparent`} />
                      </div>
                    ) : (
                      <div className={`medical-card p-12 h-80 flex items-center justify-center bg-gradient-to-br from-${solution.color}/10 to-${solution.color}/5 transition-all duration-700 ${isActive ? 'shadow-glow-intense scale-105' : ''}`}>
                        {solution.title === "IoT Patient Monitoring" ? (
                          <LiveDashboard />
                        ) : (
                          <div className="text-center">
                            <Icon className={`h-24 w-24 text-${solution.color} mx-auto mb-4 transition-transform duration-500 ${isActive ? 'scale-110 animate-float' : ''}`} />
                            <p className={`text-lg font-semibold text-${solution.color}`}>
                              {solution.subtitle}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};