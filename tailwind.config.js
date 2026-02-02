/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./pages/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
        "./app/**/*.{ts,tsx,js,jsx}",
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                display: ['Orbitron', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                border: "var(--color-border)",
                input: "var(--color-input)",
                ring: "var(--color-ring)",
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    foreground: "var(--color-primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    foreground: "var(--color-secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--color-destructive)",
                    foreground: "var(--color-foreground)",
                },
                muted: {
                    DEFAULT: "var(--color-muted)",
                    foreground: "var(--color-muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--color-accent)",
                    foreground: "var(--color-accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--color-card)",
                    foreground: "var(--color-card-foreground)",
                },
                card: {
                    DEFAULT: "var(--color-card)",
                    foreground: "var(--color-card-foreground)",
                },
                glow: {
                    primary: "var(--color-glow-primary)",
                    accent: "var(--color-glow-accent)",
                    purple: "var(--color-glow-purple)",
                },
                sidebar: {
                    DEFAULT: "var(--color-card)",
                    foreground: "var(--color-foreground)",
                    primary: "var(--color-primary)",
                    "primary-foreground": "var(--color-primary-foreground)",
                    accent: "var(--color-accent)",
                    "accent-foreground": "var(--color-accent-foreground)",
                    border: "var(--color-border)",
                    ring: "var(--color-ring)",
                },
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "pulse-glow": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary), transparent 60%), 0 0 40px color-mix(in srgb, var(--color-primary), transparent 80%)",
                    },
                    "50%": {
                        boxShadow: "0 0 30px color-mix(in srgb, var(--color-primary), transparent 40%), 0 0 60px color-mix(in srgb, var(--color-primary), transparent 60%)",
                    },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "spin-slow": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "gradient-x": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                scroll: {
                    to: {
                        transform: "translate(calc(-50% - 0.5rem))",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "spin-slow": "spin-slow 20s linear infinite",
                "gradient-x": "gradient-x 15s ease infinite",
                scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary), transparent 90%) 0%, transparent 50%, color-mix(in srgb, var(--color-accent), transparent 90%) 100%)',
            },
        },
    },
    plugins: [],
}
