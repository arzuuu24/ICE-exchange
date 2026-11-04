// 1. Initialize Supabase Connection
const supabaseUrl = 'https://pzbhunfqymwktkzkzdtf.supabase.co';
const supabaseKey = 'sb_publishable_2RvTxyGo_EAbaXskK3uwFQ_H9l9iiXD';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. State & Authentication Management
window.state = {
    hasEnteredFloor: false,
    isAdmin: false,
    currentUser: null
};

window.handleGateSignIn = async function() {
    // Hide Gate, Show Main Floor
    document.getElementById('authGateOverlay').classList.replace('gate-active', 'gate-hidden');
    document.getElementById('mainExchangeShell').classList.replace('shell-hidden', 'shell-active');
    
    // Auto-fetch live market data from Supabase
    const { data: stocks, error } = await supabase.from('market_stocks').select('*');
    if (!error) console.log("Live Market Synced:", stocks);
};

// 3. Secure Admin Verification (No exposed passwords)
window.verifyAdmin = async function(inputPassword) {
    const { data, error } = await supabase.rpc('verify_admin_secret', { secret: inputPassword });
    if (data) {
        document.body.classList.add('admin-logged-in');
        console.log("Admin Command Center Unlocked");
    }
};
