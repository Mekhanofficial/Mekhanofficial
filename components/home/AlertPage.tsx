"use client"

import { useState, useEffect } from "react";
import useSound from "use-sound";
import alertSound from "../public/sound/alert.wav";

interface Participant {
  name: string;
  country: string;
}

interface Activity {
  text: string;
  hasAmount: boolean;
  min?: number;  // Make optional
  max?: number;  // Make optional
}

interface Notification {
  id: string;
  name: string;
  country: string;
  activity: string;
  time: string;
}

// Grouped by region/culture for better matching
const PARTICIPANTS: Participant[] = [
  // North America
  { name: "Sophia Rodriguez", country: "United States" },
  { name: "Ethan Thompson", country: "United States" },
  { name: "Olivia Martin", country: "Canada" },
  { name: "Liam Tremblay", country: "Canada" },
  { name: "Diego Mendoza", country: "Mexico" },
  { name: "Isabella Cruz", country: "Mexico" },

  // South America
  { name: "Gabriela Oliveira", country: "Brazil" },
  { name: "Thiago Costa", country: "Brazil" },
  { name: "Valeria Martinez", country: "Argentina" },
  { name: "Santiago Perez", country: "Argentina" },
  { name: "Catalina Flores", country: "Chile" },
  { name: "Sebastian Gomez", country: "Colombia" },
  { name: "Lucia Torres", country: "Peru" },

  // Europe
  { name: "Hannah Schmidt", country: "Germany" },
  { name: "Louis Bernard", country: "France" },
  { name: "Giulia Romano", country: "Italy" },
  { name: "William Johnson", country: "United Kingdom" },
  { name: "Eva Novakova", country: "Czech Republic" },
  { name: "Jakub Nowak", country: "Poland" },
  { name: "Milica Ivanovic", country: "Serbia" },
  { name: "Luka Kovac", country: "Croatia" },
  { name: "Anastasia Volkova", country: "Russia" },
  { name: "Emma Johansson", country: "Sweden" },
  { name: "Lukas Nielsen", country: "Denmark" },
  { name: "Paula Sanchez", country: "Spain" },
  { name: "Dimitris Georgiou", country: "Greece" },
  { name: "Rafael Silva", country: "Portugal" },
  { name: "Bence Nagy", country: "Hungary" },
  { name: "Andrei Popescu", country: "Romania" },
  { name: "Tomas Horvath", country: "Slovakia" },
  { name: "Ida Virtanen", country: "Finland" },
  { name: "Erik Stefansson", country: "Iceland" },
  { name: "Maja Kovač", country: "Slovenia" },
  { name: "Luka Zupan", country: "Slovenia" },

  // Africa
  { name: "Kwasi Boateng", country: "Ghana" },
  { name: "Aisha Adebayo", country: "Nigeria" },
  { name: "Cheikh Ndiaye", country: "Senegal" },
  { name: "Aminata Coulibaly", country: "Mali" },
  { name: "Thando Mbatha", country: "South Africa" },
  { name: "Tendai Banda", country: "Zambia" },
  { name: "Joseph Kamau", country: "Kenya" },
  { name: "Fatuma Abdi", country: "Somalia" },
  { name: "Youssef Ben Ali", country: "Tunisia" },
  { name: "Karim El Masry", country: "Egypt" },
  { name: "Leila Amrani", country: "Morocco" },
  { name: "Samir Boukadoum", country: "Algeria" },

  // Asia
  { name: "Arjun Desai", country: "India" },
  { name: "Xiao Wei", country: "China" },
  { name: "Haruto Sato", country: "Japan" },
  { name: "Ali Raza", country: "Pakistan" },
  { name: "Mai Pham", country: "Vietnam" },
  { name: "Priya Fernando", country: "Sri Lanka" },
  { name: "Dewi Sari", country: "Indonesia" },
  { name: "Min Aung", country: "Myanmar" },
  { name: "Ji-hoon Park", country: "South Korea" },
  { name: "Rahim Khan", country: "Bangladesh" },
  { name: "Karma Dorji", country: "Bhutan" },
  { name: "Bikash Gurung", country: "Nepal" },
  { name: "Nazira Abdullaeva", country: "Uzbekistan" },
  { name: "Lobsang Tenzin", country: "Tibet" },
  { name: "Aisyah Tan", country: "Malaysia" },
  { name: "Somsak Vong", country: "Thailand" },

  // Middle East
  { name: "Yousef Al-Mansour", country: "Saudi Arabia" },
  { name: "Leila Chamoun", country: "Lebanon" },
  { name: "Khalid Al-Farsi", country: "Oman" },
  { name: "Noor Abbas", country: "Iraq" },
  { name: "Tariq Khalil", country: "Jordan" },
  { name: "Mariam Al-Thani", country: "Qatar" },
  { name: "Samir Nassar", country: "Palestine" },

  // Oceania
  { name: "Noah Taylor", country: "Australia" },
  { name: "Charlotte Smith", country: "New Zealand" },
  { name: "Litia Vakacegu", country: "Fiji" },
  { name: "Malo Tui", country: "Samoa" },
  { name: "Sione Fakahua", country: "Tonga" },

  // Caribbean
  { name: "Devon Brown", country: "Jamaica" },
  { name: "Shanice Williams", country: "Trinidad and Tobago" },
  { name: "Marcus King", country: "Barbados" },
  { name: "Danielle Joseph", country: "Saint Lucia" },

  // Eastern Europe/Central Asia
  { name: "Oksana Melnyk", country: "Ukraine" },
  { name: "Ivan Petrov", country: "Belarus" },
  { name: "Nino Beridze", country: "Georgia" },
  { name: "Aisuluu Asanova", country: "Kyrgyzstan" },
  { name: "Aruzhan Kazi", country: "Kazakhstan" },
];

const ACTIVITIES: Activity[] = [
  // Trading signals
  {
    text: "acquired the [signal] trading package",
    hasAmount: true,
    min: 1000,
    max: 15900,
  },
  { text: "joined [plan] membership", hasAmount: true, min: 1000, max: 25000 },

  // Real estate investments
  {
    text: "funded [property] development",
    hasAmount: true,
    min: 12000,
    max: 33000,
  },

  // Staking
  {
    text: "committed [amount] to [crypto] staking",
    hasAmount: true,
    min: 1,
    max: 200,
  },
  {
    text: "gained [amount] from staking returns",
    hasAmount: true,
    min: 0.1,
    max: 10,
  },

  // Account actions
  { text: "completed identity verification", hasAmount: false },
  { text: "updated profile information", hasAmount: false },
  { text: "modified security settings", hasAmount: false },

  // Financial actions
  { text: "added [amount] to balance", hasAmount: true, min: 100, max: 50000 },
  { text: "withdrew [amount] funds", hasAmount: true, min: 50, max: 20000 },
  {
    text: "sent [amount] to another member",
    hasAmount: true,
    min: 10,
    max: 5000,
  },

  // Referrals
  {
    text: "earned [amount] through referrals",
    hasAmount: true,
    min: 10,
    max: 500,
  },
  { text: "invited a new member", hasAmount: false },
];

const SIGNAL_PACKAGES = [
  "TradeMaster Pro",
  "Alpha Signals",
  "Quantum Trading",
  "Pip Hunter",
  "Elite Trader Suite",
  "Market Navigator",
];

const MEMBERSHIPS = ["Gold", "Diamond", "Executive", "Basic"];

const DEVELOPMENTS = [
  "Harbor View Towers",
  "Tech Park Silicon Valley",
  "Storage Solutions Austin",
  "University Heights Dorms",
  "Greenfield Industrial Zone",
  "Innovation Hub Dallas",
];

const CRYPTO_ASSETS = [
  "Bitcoin",
  "Ethereum",
  "Cardano",
  "Solana",
  "Polkadot",
  "Avalanche",
  "Chainlink",
  "Litecoin",
  "Ripple",
];

const INITIAL_DELAY = 3000;
const DISPLAY_DURATION = 7000;
const TRANSITION_DURATION = 1000;

const ActivityNotification = () => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const formatValue = (min: number, max: number, isCrypto = false): string => {
    const value = Math.random() * (max - min) + min;
    if (isCrypto) {
      const decimals = Math.floor(Math.random() * 7) + 2;
      return value.toFixed(decimals);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: value < 1 ? 2 : 0,
    }).format(value);
  };

  const createRandomNotification = (): Notification => {
    const randomParticipant = PARTICIPANTS[Math.floor(Math.random() * PARTICIPANTS.length)];
    const randomActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let activityText = randomActivity.text;
    if (randomActivity.hasAmount) {
      if (randomActivity.min !== undefined && randomActivity.max !== undefined) {
        const isCrypto = activityText.includes("staking") || activityText.includes("committed");
        const value = formatValue(randomActivity.min, randomActivity.max, isCrypto);
        activityText = activityText.replace("[amount]", value);
      }

      if (activityText.includes("[signal]")) {
        activityText = activityText.replace(
          "[signal]",
          SIGNAL_PACKAGES[Math.floor(Math.random() * SIGNAL_PACKAGES.length)]
        );
      }
      if (activityText.includes("[plan]")) {
        activityText = activityText.replace(
          "[plan]",
          MEMBERSHIPS[Math.floor(Math.random() * MEMBERSHIPS.length)]
        );
      }
      if (activityText.includes("[property]")) {
        activityText = activityText.replace(
          "[property]",
          DEVELOPMENTS[Math.floor(Math.random() * DEVELOPMENTS.length)]
        );
      }
      if (activityText.includes("[crypto]")) {
        activityText = activityText.replace(
          "[crypto]",
          CRYPTO_ASSETS[Math.floor(Math.random() * CRYPTO_ASSETS.length)]
        );
      }
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: randomParticipant.name,
      country: randomParticipant.country,
      activity: activityText,
      time,
    };
  };

  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  useEffect(() => {
    let initialDelayTimer: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const displayNewNotification = () => {
      const newNotification = createRandomNotification();
      setCurrentNotification(newNotification);
      setIsVisible(true);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          displayNewNotification();
        }, TRANSITION_DURATION);
      }, DISPLAY_DURATION);
    };

    initialDelayTimer = setTimeout(() => {
      displayNewNotification();
    }, INITIAL_DELAY);

    return () => {
      clearTimeout(initialDelayTimer);
      clearTimeout(hideTimeout);
    };
  }, [hasUserInteracted]);

return (
  <div className="fixed left-4 bottom-4 z-50 w-72 sm:w-80 md:w-96">
    <div
      className={`transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {currentNotification && (
        <div className="bg-slate-800 shadow-xl border border-teal-500 overflow-hidden rounded-tl-xl rounded-br-xl">
          <div className="p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-900 flex items-center justify-center text-teal-300 font-bold">
                {currentNotification.name.charAt(0)}
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-slate-100">
                  {currentNotification.name}{" "}
                  <span className="text-xs text-slate-400">
                    ({currentNotification.country})
                  </span>
                </p>
                <p className="text-xs text-teal-300">{currentNotification.activity}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {currentNotification.time}
                </p>
              </div>
            </div>
          </div>
          <div
            className="h-0.5 w-full bg-teal-500 animate-progress"
            style={{ animationDuration: `${DISPLAY_DURATION}ms` }}
          ></div>
        </div>
      )}
    </div>
  </div>
);

}

export default ActivityNotification;