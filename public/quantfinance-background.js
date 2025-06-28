// public/quantfinance-background.js
/**
 * Quantitative Finance Background with Jumping Digits
 * Creates a dynamic background with stock market style jumping numbers
 */

class QuantFinanceBackground {
  constructor(containerId = 'qf-background', options = {}) {
    this.containerId = containerId;
    this.options = {
      digitCount: options.digitCount || 150,
      colorPrimary: options.colorPrimary || '#0ea5e9', // Sky blue accent color
      colorSecondary: options.colorSecondary || '#38bdf8', // Lighter blue
      colorPositive: options.colorPositive || '#10b981', // Green for up ticks
      colorNegative: options.colorNegative || '#ef4444', // Red for down ticks
      updateInterval: options.updateInterval || 800, // Update every 800ms
      fontSize: options.fontSize || '16px', // Increased from 14px
      fontFamily: options.fontFamily || 'JetBrains Mono, monospace',
      formulaOpacity: options.formulaOpacity || 0.30, // Increased from 0.15
      minUpdateFrequency: options.minUpdateFrequency || 0.4, // Increased from 0.3
      maxUpdateFrequency: options.maxUpdateFrequency || 0.8, // Increased from 0.7
      patternVariety: options.patternVariety || 'high', // High variety in patterns
      animationStyle: options.animationStyle || 'smooth', // Smooth animation transitions
    };
    
    this.container = null;
    this.digits = [];
    this.formulas = [
      '∫₋∞^∞ e^(-x²/2) dx = √(2π)', // Normal distribution integral
      'dS = μSdt + σSdW', // Stochastic differential equation
      'C = S₀N(d₁) - Ke^(-rT)N(d₂)', // Black-Scholes formula
      'VaR = μ - zα·σ·√t', // Value at Risk
      'Sharpe = (E[R_p] - R_f)/σ_p', // Sharpe ratio
      'β = Cov(r_i,r_m)/Var(r_m)', // Beta coefficient
      'CAPM: E[R_i] = R_f + β_i(E[R_m] - R_f)', // Capital Asset Pricing Model
      'σ² = E[(X-μ)²]', // Variance formula
      'PV = FV/(1+r)^t', // Present value formula
      'Sortino = (R_p - R_f)/σ_d', // Sortino ratio
      'VIX = σ√(365/30)·100%', // Volatility index approximation
      'APT: R_i = E[R_i] + β_i1F_1 + ... + β_inF_n + ε_i', // Arbitrage pricing theory
    ];
    
    this.stockSymbols = [
      'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 
      'JPM', 'BAC', 'GS', 'MS', 'C', 'WFC',
      'BTC', 'ETH', 'XRP', 'ADA', 'SOL', 'DOT',
      'SPY', 'QQQ', 'DIA', 'IWM', 'VIX', 'TLT'
    ];
    
    this.indicators = [
      'RSI', 'MACD', 'EMA', 'SMA', 'BB', 'VWAP',
      'OBV', 'ATR', 'ADX', 'Stoch', 'CMF', 'MFI'
    ];
    
    this.updateIntervalId = null;
    this.initialize();
  }
  
  initialize() {
    // Create or get container
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
    }
    
    this.container = container;
    
    // Set container style
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      overflow: 'hidden',
      opacity: '0.25', // Increased from 0.12
      pointerEvents: 'none',
    });
    
    // Add mathematical formulas
    this.addFormulas();
    
    // Create digits
    this.createDigits();
    
    // Start the animation
    this.startAnimation();
  }
  
  addFormulas() {
    // Add mathematical formulas to the background
    for (let i = 0; i < this.formulas.length; i++) {
      const formulaElement = document.createElement('div');
      
      Object.assign(formulaElement.style, {
        position: 'absolute',
        fontFamily: this.options.fontFamily,
        fontSize: '22px', // Increased from 18px
        color: this.options.colorPrimary,
        opacity: this.options.formulaOpacity.toString(),
        whiteSpace: 'nowrap',
        left: `${Math.random() * 80 + 5}%`,
        top: `${Math.random() * 80 + 5}%`,
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
        transition: 'opacity 2s ease-in-out',
        fontWeight: '500', // Added for better visibility
      });
      
      formulaElement.textContent = this.formulas[i];
      this.container.appendChild(formulaElement);
      
      // Add enhanced animation to formulas
      setInterval(() => {
        formulaElement.style.opacity = (parseFloat(formulaElement.style.opacity) * 0.7 + 
          this.options.formulaOpacity * 0.3).toString(); // More dramatic opacity change
      }, 3000 + Math.random() * 3000); // Faster transition
    }
  }
  
  createDigits() {
    // Create the financial digits
    for (let i = 0; i < this.options.digitCount; i++) {
      this.createDigit();
    }
  }
  
  createDigit() {
    const digit = document.createElement('div');
    
    // Create more variety in the types of elements displayed
    const displayType = Math.random();
    let content;
    let color;
    
    if (displayType < 0.2) {
      // Stock symbol with random price
      const symbol = this.stockSymbols[Math.floor(Math.random() * this.stockSymbols.length)];
      const price = (Math.random() * 1000 + 10).toFixed(2);
      content = `${symbol} $${price}`;
      color = Math.random() > 0.5 ? this.options.colorPositive : this.options.colorNegative;
    } else if (displayType < 0.3) {
      // Technical indicator with value
      const indicator = this.indicators[Math.floor(Math.random() * this.indicators.length)];
      const value = (Math.random() * 100).toFixed(2);
      content = `${indicator}: ${value}`;
      color = this.options.colorPrimary;
    } else if (displayType < 0.4) {
      // Option chain data
      const symbol = this.stockSymbols[Math.floor(Math.random() * this.stockSymbols.length)];
      const strike = (Math.random() * 200 + 50).toFixed(1);
      const premium = (Math.random() * 10).toFixed(2);
      content = `${symbol} ${strike}C $${premium}`;
      color = Math.random() > 0.5 ? this.options.colorSecondary : this.options.colorPrimary;
    } else {
      // Random number with 2 decimal places (percentage changes)
      const value = (Math.random() * 100).toFixed(2);
      const isPositive = Math.random() > 0.5;
      content = isPositive ? `+${value}%` : `-${value}%`;
      color = isPositive ? this.options.colorPositive : this.options.colorNegative;
    }
    
    // Position and style with improved visual design
    const fontSize = Math.random() > 0.7 ? 
      (parseInt(this.options.fontSize) + 4) + 'px' : this.options.fontSize; // Enhanced size difference
    
    Object.assign(digit.style, {
      position: 'absolute',
      fontFamily: this.options.fontFamily,
      fontSize: fontSize,
      color: color,
      left: `${Math.random() * 95}%`,
      top: `${Math.random() * 95}%`,
      opacity: (Math.random() * 0.6 + 0.4).toString(), // Increased visibility
      textShadow: '0 0 3px rgba(0,0,0,0.3)', // Enhanced text shadow
      fontWeight: '600', // Added for better visibility
      transition: this.options.animationStyle === 'smooth' ? 
        'opacity 0.8s ease-in-out, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 
        'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    });
    
    digit.textContent = content;
    this.container.appendChild(digit);
    
    this.digits.push({
      element: digit,
      type: displayType < 0.2 ? 'stock' : 
            displayType < 0.3 ? 'indicator' : 
            displayType < 0.4 ? 'option' : 'percentage',
      lastUpdate: Date.now(),
    });
    
    return digit;
  }
  
  updateDigits() {
    const now = Date.now();
    const updateFrequency = Math.random() * 
      (this.options.maxUpdateFrequency - this.options.minUpdateFrequency) + 
      this.options.minUpdateFrequency;
    
    // Update a random subset of digits
    const digitsToUpdate = Math.floor(this.digits.length * updateFrequency);
    
    for (let i = 0; i < digitsToUpdate; i++) {
      const randomIndex = Math.floor(Math.random() * this.digits.length);
      const digit = this.digits[randomIndex];
      
      // Don't update if it was updated very recently
      if (now - digit.lastUpdate < this.options.updateInterval * 0.5) continue;
      
      digit.lastUpdate = now;
      
      // Update content based on type
      switch(digit.type) {
        case 'stock':
          // Update stock price
          const symbol = this.stockSymbols[Math.floor(Math.random() * this.stockSymbols.length)];
          const price = (Math.random() * 1000 + 10).toFixed(2);
          digit.element.textContent = `${symbol} $${price}`;
          digit.element.style.color = Math.random() > 0.5 ? 
            this.options.colorPositive : this.options.colorNegative;
          break;
          
        case 'indicator':
          // Update technical indicator
          const indicator = this.indicators[Math.floor(Math.random() * this.indicators.length)];
          const indValue = (Math.random() * 100).toFixed(2);
          digit.element.textContent = `${indicator}: ${indValue}`;
          break;
          
        case 'option':
          // Update option data
          const optSymbol = this.stockSymbols[Math.floor(Math.random() * this.stockSymbols.length)];
          const strike = (Math.random() * 200 + 50).toFixed(1);
          const premium = (Math.random() * 10).toFixed(2);
          const callPut = Math.random() > 0.5 ? 'C' : 'P';
          digit.element.textContent = `${optSymbol} ${strike}${callPut} $${premium}`;
          break;
          
        default: // percentage
          // Update percentage
          const value = (Math.random() * 100).toFixed(2);
          const isPositive = Math.random() > 0.5;
          digit.element.textContent = isPositive ? `+${value}%` : `-${value}%`;
          digit.element.style.color = isPositive ? 
            this.options.colorPositive : this.options.colorNegative;
          break;
      }
      
      // Enhanced animation with different patterns based on settings
      if (this.options.patternVariety === 'high') {
        // More varied animations
        const animType = Math.random();
        
        if (animType < 0.3) {
          // Jump animation
          digit.element.style.transform = 'translateY(-8px)'; // Larger jump
          setTimeout(() => {
            if (digit.element) {
              digit.element.style.transform = 'translateY(0)';
            }
          }, 300);
        } else if (animType < 0.6) {
          // Pulse animation
          digit.element.style.transform = 'scale(1.2)'; // Larger scale
          setTimeout(() => {
            if (digit.element) {
              digit.element.style.transform = 'scale(1)';
            }
          }, 300);
        } else {
          // Fade animation
          const currentOpacity = parseFloat(digit.element.style.opacity);
          digit.element.style.opacity = (currentOpacity * 0.7).toString(); // More dramatic fade
          setTimeout(() => {
            if (digit.element) {
              digit.element.style.opacity = (Math.random() * 0.6 + 0.4).toString(); // Higher base opacity
            }
          }, 400);
        }
      } else {
        // Simple jump animation (original style)
        digit.element.style.transform = 'translateY(-8px)'; // Larger jump
        setTimeout(() => {
          if (digit.element) {
            digit.element.style.transform = 'translateY(0)';
          }
        }, 300);
      }
      
      // Occasionally change opacity
      if (Math.random() > 0.7) {
        digit.element.style.opacity = (Math.random() * 0.6 + 0.4).toString(); // Higher base opacity
      }
    }
  }
  
  startAnimation() {
    this.updateIntervalId = setInterval(() => {
      this.updateDigits();
    }, this.options.updateInterval);
    
    // Handle visibility changes to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(this.updateIntervalId);
      } else {
        this.updateIntervalId = setInterval(() => {
          this.updateDigits();
        }, this.options.updateInterval);
      }
    });
  }
  
  // Clean up method
  destroy() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
    
    if (this.container) {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
      
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
    
    this.digits = [];
  }
}

// Initialize the background when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create the background container if it doesn't exist
  let backgroundContainer = document.getElementById('qf-background');
  if (!backgroundContainer) {
    backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'qf-background';
    document.body.insertBefore(backgroundContainer, document.body.firstChild);
  }
  
  // Initialize with enhanced options
  const qfBackground = new QuantFinanceBackground('qf-background', {
    digitCount: window.innerWidth < 768 ? 100 : 180, // Increased from 80/150
    patternVariety: 'high',
    animationStyle: 'smooth',
    formulaOpacity: 0.30, // Increased from 0.18
    updateInterval: 650 // Faster updates
  });
  
  // Make it accessible globally if needed
  window.qfBackground = qfBackground;
});