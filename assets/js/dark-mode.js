// Dark Mode Implementation for NeuralGlow.ai
// This script handles the automatic dark/light mode switching based on user preferences

// Function to set the theme based on user preference or system setting
function setThemePreference() {
  const theme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Check if user has a saved preference
  if (theme === 'dark' || (!theme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (document.getElementById('theme-toggle')) {
      document.getElementById('theme-toggle').checked = true;
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (document.getElementById('theme-toggle')) {
      document.getElementById('theme-toggle').checked = false;
    }
  }
}

// Function to toggle between light and dark mode
function toggleTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

// Watch for system preference changes
function watchSystemPreference() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only change theme if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (document.getElementById('theme-toggle')) {
          document.getElementById('theme-toggle').checked = true;
        }
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (document.getElementById('theme-toggle')) {
          document.getElementById('theme-toggle').checked = false;
        }
      }
    }
  });
}

// Initialize theme when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set the initial theme
  setThemePreference();
  
  // Watch for system preference changes
  watchSystemPreference();
  
  // Add event listener to theme toggle if it exists
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }
});
