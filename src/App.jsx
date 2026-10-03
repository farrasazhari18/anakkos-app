import React, { useState, useEffect } from 'react';

// --- ICONS (iOS/OneUI Style) ---
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    home: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
    wallet: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>,
    zap: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>,
    bag: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>,
    tools: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.83M11.42 15.17l-.58-.58-.58.58m1.16-1.16l2.12-2.12c.732-.732 1.912-.732 2.644 0v0c.732.732.732 1.912 0 2.644l-2.12 2.12m-3.224-3.224l-3.224-3.224c-.732-.732-.732-1.912 0-2.644v0c.732-.732 1.912-.732 2.644 0l3.224 3.224m-6.448 0L4.5 7.5A2.652 2.652 0 018.25 3.75l3.224 3.224" /></svg>,
    sun: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>,
    moon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>,
    edit: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
    check: <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>,
    trash: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>,
    upload: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>,
    plus: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  };
  return icons[name] || null;
};

// --- HELPERS ---
const formatIDR = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
const formatDate = (dateObj) => {
  const d = new Date(dateObj);
  let month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showToast, setShowToast] = useState('');
  const [isDark, setIsDark] = useState(true);

  // Profil & Dana Darurat State
  const [profile, setProfile] = useState({
    salary: 8905920,
    bonus: 0,
    emergencySavings: 15000000,
  });

  // History Saldo State
  const [balanceHistory, setBalanceHistory] = useState([
    { id: 1, date: '2026-09-30', balance: 2435128 },
    { id: 2, date: '2026-10-01', balance: 2302728 },
    { id: 3, date: '2026-10-02', balance: 2156458 },
    { id: 4, date: formatDate(new Date()), balance: 2156458 } 
  ]);

  // History Listrik State
  const [electricityHistory, setElectricityHistory] = useState([
    { id: 1, date: '2026-09-25', kwh: 65.5 },
    { id: 2, date: '2026-10-01', kwh: 48.0 },
    { id: 3, date: formatDate(new Date()), kwh: 40.5 }
  ]);

  // Impulse History State
  const [impulseLogs, setImpulseLogs] = useState([
    { id: 1, name: 'Kopi Susu Gula Aren', price: 25000, date: '2026-10-01' },
    { id: 2, name: 'Skin Game', price: 150000, date: '2026-10-02' }
  ]);

  // Data E-Statement dari PDF Bank Jago User (Sekarang jadi State agar bisa ditambah manual)
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-09-04', name: 'SHOPEE', amount: 46000, category: 'E-Commerce' },
    { id: 2, date: '2026-09-04', name: 'abenkk Gorengan', amount: 20000, category: 'Makan & Minum' },
    { id: 3, date: '2026-09-04', name: 'FAMILYMART', amount: 12100, category: 'Makan & Minum' },
    { id: 4, date: '2026-09-05', name: 'SHOPEE', amount: 98175, category: 'E-Commerce' },
    { id: 5, date: '2026-09-05', name: 'Warkop Omah21', amount: 5000, category: 'Makan & Minum' },
    { id: 6, date: '2026-09-06', name: 'ARENA SPORT CENTER', amount: 50000, category: 'Lainnya' },
    { id: 7, date: '2026-09-06', name: 'MIE ACEH MUTIARA 2', amount: 40000, category: 'Makan & Minum' },
    { id: 8, date: '2026-09-07', name: 'Mirai Kleen Laundry', amount: 22400, category: 'Lainnya' },
    { id: 9, date: '2026-09-07', name: 'MIDDLESON HAIRCUT', amount: 70000, category: 'Lainnya' },
    { id: 10, date: '2026-09-08', name: 'PLN', amount: 52750, category: 'Tagihan & Digital' },
    { id: 11, date: '2026-09-08', name: 'SHOPEE', amount: 122200, category: 'E-Commerce' },
    { id: 12, date: '2026-09-08', name: 'SHOPEE', amount: 211505, category: 'E-Commerce' },
    { id: 13, date: '2026-09-09', name: 'Tokopedia', amount: 41500, category: 'E-Commerce' },
    { id: 14, date: '2026-09-09', name: 'Grab', amount: 24000, category: 'Transportasi' },
    { id: 15, date: '2026-09-10', name: 'Coda Payments', amount: 6000, category: 'Tagihan & Digital' },
    { id: 16, date: '2026-09-11', name: 'Google Play', amount: 32190, category: 'Tagihan & Digital' },
    { id: 17, date: '2026-09-16', name: 'APOTEK ALPRO', amount: 56500, category: 'Lainnya' },
    { id: 18, date: '2026-09-20', name: 'GO-CAR', amount: 23000, category: 'Transportasi' },
    { id: 19, date: '2026-09-22', name: 'kickavenue.com', amount: 560000, category: 'E-Commerce' },
    { id: 20, date: '2026-09-26', name: 'Almaz Fried Chicken', amount: 39000, category: 'Makan & Minum' },
    { id: 21, date: '2026-09-28', name: 'SHOPEE', amount: 133900, category: 'E-Commerce' },
  ]);

  // Kalkulasi E-Statement (Berdasarkan state transactions)
  const eStatementStats = transactions.reduce((acc, curr) => {
    acc.total += curr.amount;
    if(acc.categories[curr.category]) {
      acc.categories[curr.category] += curr.amount;
    } else {
      acc.categories[curr.category] = curr.amount;
    }
    return acc;
  }, { total: 0, categories: {} });

  const categoryColors = {
    'E-Commerce': 'bg-blue-500',
    'Makan & Minum': 'bg-orange-500',
    'Tagihan & Digital': 'bg-purple-500',
    'Transportasi': 'bg-emerald-500',
    'Lainnya': 'bg-gray-400'
  };

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(''), 3000);
  };

  // --- PAYDAY LOGIC (Akhir bulan, mundur ke Jumat jika weekend) ---
  const getPayday = (year, month) => {
    let lastDay = new Date(year, month + 1, 0); 
    let dayOfWeek = lastDay.getDay();
    if (dayOfWeek === 6) { 
        lastDay.setDate(lastDay.getDate() - 1); // Sabtu -> Jumat
    } else if (dayOfWeek === 0) { 
        lastDay.setDate(lastDay.getDate() - 2); // Minggu -> Jumat
    }
    return lastDay;
  };

  const calculateDaysToPayday = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let thisMonthPayday = getPayday(today.getFullYear(), today.getMonth());
    thisMonthPayday.setHours(0,0,0,0);

    if (today > thisMonthPayday) {
        let nextMonthPayday = getPayday(today.getFullYear(), today.getMonth() + 1);
        nextMonthPayday.setHours(0,0,0,0);
        return Math.ceil((nextMonthPayday - today) / (1000 * 60 * 60 * 24));
    } else if (today.getTime() === thisMonthPayday.getTime()) {
        return 0; // Hari H gajian
    } else {
        return Math.ceil((thisMonthPayday - today) / (1000 * 60 * 60 * 24));
    }
  };
  
  const daysToPayday = calculateDaysToPayday();
  const currentBalance = balanceHistory.sort((a,b) => new Date(b.date) - new Date(a.date))[0]?.balance || 0;
  const safeToSpend = daysToPayday > 0 ? currentBalance / daysToPayday : currentBalance;

  // --- ELECTRICITY LOGIC ---
  const getElectricityStats = () => {
    const sorted = [...electricityHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sorted.length === 0) return { avg: 0, daysLeft: 0, latestKwh: 0 };
    
    let totalDrop = 0;
    let totalDays = 0;
    for (let i = 1; i < sorted.length; i++) {
        const drop = sorted[i-1].kwh - sorted[i].kwh;
        const days = (new Date(sorted[i].date) - new Date(sorted[i-1].date)) / (1000 * 60 * 60 * 24);
        if (drop >= 0 && days > 0) { 
            totalDrop += drop;
            totalDays += days;
        }
    }
    const avg = totalDays > 0 ? (totalDrop / totalDays) : 0;
    const latestEntry = sorted[sorted.length - 1];
    
    const daysPassedSinceCheck = (new Date().setHours(0,0,0,0) - new Date(latestEntry.date).setHours(0,0,0,0)) / (1000 * 60 * 60 * 24);
    let daysLeft = 0;
    if (avg > 0) daysLeft = Math.max(0, Math.floor((latestEntry.kwh / avg) - daysPassedSinceCheck));
    
    return { avg, daysLeft, latestKwh: latestEntry.kwh };
  };
  const elecStats = getElectricityStats();

  // --- DYNAMIC EXPENSE LOGIC ---
  const getDynamicMonthlyExpense = () => {
    const sorted = [...balanceHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sorted.length < 2) return 0;

    let totalDrop = 0;
    let totalDays = 0;
    for (let i = 1; i < sorted.length; i++) {
        const drop = sorted[i-1].balance - sorted[i].balance;
        const days = (new Date(sorted[i].date) - new Date(sorted[i-1].date)) / (1000 * 60 * 60 * 24);
        if (drop >= 0 && days > 0) {
            totalDrop += drop;
            totalDays += days;
        }
    }
    const avgDailyDrop = totalDays > 0 ? (totalDrop / totalDays) : 0;
    return avgDailyDrop * 30; 
  };
  const estimatedMonthlyExpense = getDynamicMonthlyExpense();
  const survivalMonths = estimatedMonthlyExpense > 0 ? (profile.emergencySavings / estimatedMonthlyExpense).toFixed(1) : 0;

  // --- DAILY RECAP LOGIC ---
  const getDailyRecaps = () => {
    const sorted = [...balanceHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.map((entry, index) => {
        const olderEntry = sorted[index + 1];
        let expense = 0;
        let isIncome = false;
        if (olderEntry) {
            const diff = olderEntry.balance - entry.balance;
            if (diff > 0) expense = diff;
            else if (diff < 0) {
                expense = Math.abs(diff);
                isIncome = true;
            }
        }
        return { ...entry, expense, isIncome, hasOlderData: !!olderEntry };
    });
  };

  // 1. Home View
  const HomeView = () => {
    const totalWasted = impulseLogs.reduce((acc, item) => acc + item.price, 0);

    let warningText = "";
    if (safeToSpend < 20000) warningText = "⚠️ Dompet tipis, mending puasa sunnah aja deh hari ini.";
    else if (safeToSpend < 50000) warningText = "Cuma cukup buat makan warteg, jangan sok ngopi di cafe.";
    else warningText = "Masih aman. Tapi ingat, jangan impulsif!";

    return (
      <div className="p-6 space-y-6 animate-fade-in pb-32">
        <header className="pt-4 pb-2">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 tracking-tight">Halo, Anak Kos!</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Realita dompetmu hari ini:</p>
        </header>

        {/* Main Hero Card: Safe to Spend */}
        <div className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-2">Batas Jajan Harianmu</p>
          <div className="text-5xl font-extrabold dark:text-white text-black tracking-tighter mb-4">
            {formatIDR(safeToSpend)}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold dark:text-emerald-400 text-emerald-600">{daysToPayday === 0 ? 'HARI INI GAJIAN CUI!' : `${daysToPayday} hari lagi gajian`}</span>
          </div>
          
          <div className={`mt-5 p-3.5 w-full rounded-2xl text-xs flex justify-center gap-2 items-center font-semibold
            ${safeToSpend < 30000 ? 'dark:bg-rose-500/10 bg-rose-50 dark:text-rose-400 text-rose-600' : 'dark:bg-blue-500/10 bg-blue-50 dark:text-blue-400 text-blue-600'}`}>
            {warningText}
          </div>
        </div>

        {/* Small Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 dark:bg-amber-500/20 bg-amber-100 rounded-full">
                <Icon name="zap" className="w-4 h-4 dark:text-amber-400 text-amber-600" />
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 font-medium">Listrik Kos</p>
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white text-black">{elecStats.daysLeft}</p>
              <p className="text-[10px] dark:text-gray-500 text-gray-400 font-medium">Hari Tersisa</p>
            </div>
          </div>
          
          <div className="p-5 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 dark:bg-rose-500/20 bg-rose-100 rounded-full">
                <Icon name="bag" className="w-4 h-4 dark:text-rose-400 text-rose-600" />
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 font-medium">Uang Menguap</p>
            </div>
            <div>
              <p className="text-xl font-bold dark:text-rose-400 text-rose-500">{formatIDR(totalWasted).replace('Rp', '')}</p>
              <p className="text-[10px] dark:text-gray-500 text-gray-400 font-medium">Penyesalan Bulan Ini</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Keuangan View (E-Statement, Update Saldo, Recap)
  const KeuanganView = () => {
    const [subTab, setSubTab] = useState('estatement'); // 'estatement' or 'saldo'
    const [todayInput, setTodayInput] = useState('');
    const [dateInput, setDateInput] = useState(formatDate(new Date()));
    const dailyRecaps = getDailyRecaps();

    // States untuk fitur E-Statement
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [newTrx, setNewTrx] = useState({ date: formatDate(new Date()), name: '', amount: '', category: 'Makan & Minum' });

    // States untuk Edit Rekap Saldo
    const [editingBalanceId, setEditingBalanceId] = useState(null);
    const [editBalanceForm, setEditBalanceForm] = useState({ date: '', balance: '' });

    // States untuk Edit Transaksi E-Statement
    const [editingTrxId, setEditingTrxId] = useState(null);
    const [editTrxForm, setEditTrxForm] = useState({ date: '', name: '', amount: '', category: 'Makan & Minum' });

    const handleUpdateBalance = (e) => {
      e.preventDefault();
      if(!todayInput || !dateInput) return;
      setBalanceHistory(prev => {
         const filtered = prev.filter(item => item.date !== dateInput);
         return [{ id: Date.now(), date: dateInput, balance: parseFloat(todayInput) }, ...filtered];
      });
      setTodayInput('');
      triggerToast("Mantap! Saldo berhasil dicatat.");
    };

    const handleAddTransaction = (e) => {
      e.preventDefault();
      if(!newTrx.name || !newTrx.amount) return;
      
      const newEntry = {
        id: Date.now(),
        date: newTrx.date,
        name: newTrx.name,
        amount: parseFloat(newTrx.amount),
        category: newTrx.category
      };
      
      setTransactions([newEntry, ...transactions]);
      setNewTrx({ date: formatDate(new Date()), name: '', amount: '', category: 'Makan & Minum' });
      setShowAddTransaction(false);
      triggerToast("Dosa baru tercatat! Bagus, jujur itu mahal.");
    };

    const startEditBalance = (record) => {
      setEditingBalanceId(record.id);
      setEditBalanceForm({ date: record.date, balance: record.balance });
    };
    
    const saveEditBalance = (id) => {
      setBalanceHistory(prev => prev.map(item => item.id === id ? { ...item, date: editBalanceForm.date, balance: parseFloat(editBalanceForm.balance) } : item));
      setEditingBalanceId(null);
      triggerToast("Data saldo berhasil diubah.");
    };
    
    const deleteBalance = (id) => setBalanceHistory(prev => prev.filter(item => item.id !== id));

    const startEditTrx = (trx) => {
      setEditingTrxId(trx.id);
      setEditTrxForm({ date: trx.date, name: trx.name, amount: trx.amount, category: trx.category });
    };

    const saveEditTrx = (id) => {
      setTransactions(prev => prev.map(item => item.id === id ? { ...item, date: editTrxForm.date, name: editTrxForm.name, amount: parseFloat(editTrxForm.amount), category: editTrxForm.category } : item));
      setEditingTrxId(null);
      triggerToast("Daftar dosa berhasil direvisi.");
    };

    const deleteTrx = (id) => setTransactions(prev => prev.filter(item => item.id !== id));

    // Filter transaksi berdasarkan kategori yang diklik
    const filteredTransactions = selectedCategory 
      ? transactions.filter(t => t.category === selectedCategory) 
      : transactions;

    return (
      <div className="p-6 space-y-6 animate-fade-in pb-32">
        {/* SubTab Toggler */}
        <div className="flex bg-gray-200 dark:bg-[#2c2c2e] p-1 rounded-full w-full">
          <button onClick={() => setSubTab('estatement')} className={`flex-1 text-xs font-bold py-2.5 rounded-full transition-all ${subTab === 'estatement' ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>E-Statement</button>
          <button onClick={() => setSubTab('saldo')} className={`flex-1 text-xs font-bold py-2.5 rounded-full transition-all ${subTab === 'saldo' ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>Rekap Saldo</button>
        </div>

        {subTab === 'estatement' ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Upload Button */}
            <label className="flex justify-center items-center gap-2 w-full p-4 dark:bg-[#1c1c1e] bg-white shadow-sm border-2 border-dashed dark:border-gray-600 border-gray-300 rounded-2xl cursor-pointer hover:opacity-80 transition-opacity">
              <Icon name="upload" className="w-5 h-5 dark:text-blue-400 text-blue-600" />
              <span className="text-sm font-semibold dark:text-white text-gray-900">Upload PDF E-Statement Baru</span>
              <input type="file" accept=".pdf" className="hidden" onChange={() => triggerToast("File PDF diterima. Sabar, robotnya lagi baca (pura-puranya)...")} />
            </label>

            {/* E-Statement Dashboard */}
            <div className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm">
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500">Total Pengeluaran</h3>
                   <p className="text-2xl font-bold dark:text-white text-black mt-1">{formatIDR(eStatementStats.total)}</p>
                   <p className="text-[10px] dark:text-gray-500 text-gray-400 mt-1">Bulan September 2026</p>
                 </div>
               </div>
               
               <p className="text-[11px] mb-3 dark:text-gray-400 text-gray-500 italic">Klik kategori di bawah untuk menyaring transaksi:</p>
               <div className="space-y-4">
                  {Object.entries(eStatementStats.categories).map(([catName, amount], idx) => {
                    const percent = ((amount / eStatementStats.total) * 100).toFixed(0);
                    const colorClass = categoryColors[catName] || 'bg-gray-500';
                    const isSelected = selectedCategory === catName;
                    
                    return (
                      <div key={idx} onClick={() => setSelectedCategory(isSelected ? null : catName)} className={`cursor-pointer transition-all p-2 -m-2 rounded-xl ${isSelected ? 'dark:bg-white/10 bg-black/5 ring-1 ring-gray-400/50' : 'hover:dark:bg-white/5 hover:bg-black/5'}`}>
                        <div className="flex justify-between text-xs mb-1.5 items-end">
                          <span className={`font-medium ${isSelected ? 'dark:text-white text-black' : 'dark:text-gray-300 text-gray-700'}`}>
                            {catName} {isSelected && '✓'}
                          </span>
                          <div className="text-right">
                            <span className="font-bold dark:text-white text-black mr-2">{formatIDR(amount)}</span>
                            <span className="dark:text-gray-500 text-gray-400 text-[10px]">{percent}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[#2c2c2e] rounded-full h-2 overflow-hidden">
                          <div className={`${colorClass} h-2 rounded-full`} style={{width: `${percent}%`}}></div>
                        </div>
                      </div>
                    );
                  })}
               </div>
               
               {/* Sarcastic Note */}
               <div className="mt-5 p-3 dark:bg-rose-500/10 bg-rose-50 rounded-xl text-xs dark:text-rose-400 text-rose-600 text-center font-medium">
                 {selectedCategory 
                    ? `Oh, jadi ini rincian dosa-dosa kamu di kategori ${selectedCategory}...` 
                    : 'Belanja E-Commerce mendominasi. Yakin tuh barang butuh semua? 🙄'}
               </div>
            </div>

            {/* Transaction List with Manual Input */}
            <div>
               <div className="flex justify-between items-center mb-3 px-2">
                 <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide">
                    {selectedCategory ? `Filter: ${selectedCategory}` : 'Daftar Dosa (Pengeluaran)'}
                 </h3>
                 <button onClick={() => setShowAddTransaction(!showAddTransaction)} className="flex items-center gap-1 text-[11px] font-bold dark:text-blue-400 text-blue-600 dark:bg-blue-500/20 bg-blue-100 px-2.5 py-1.5 rounded-full active:scale-95 transition-transform">
                   <Icon name={showAddTransaction ? "trash" : "plus"} className="w-3 h-3" />
                   {showAddTransaction ? "Batal Input" : "Input Manual"}
                 </button>
               </div>

               {/* Manual Input Form Modal/Area */}
               {showAddTransaction && (
                 <form onSubmit={handleAddTransaction} className="p-4 mb-4 rounded-[1.5rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col gap-3 animate-fade-in border dark:border-white/10 border-black/5">
                   <p className="text-xs font-semibold dark:text-gray-300 text-gray-700">Ada dosa belanja yang luput dari PDF?</p>
                   <div className="flex gap-2">
                     <input type="date" value={newTrx.date} onChange={e=>setNewTrx({...newTrx, date: e.target.value})} className="w-1/3 p-3 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black [color-scheme:dark]" required />
                     <select value={newTrx.category} onChange={e=>setNewTrx({...newTrx, category: e.target.value})} className="flex-1 p-3 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black cursor-pointer">
                       <option value="Makan & Minum">Makan & Minum</option>
                       <option value="E-Commerce">E-Commerce</option>
                       <option value="Tagihan & Digital">Tagihan & Digital</option>
                       <option value="Transportasi">Transportasi</option>
                       <option value="Lainnya">Lainnya</option>
                     </select>
                   </div>
                   <div className="flex gap-2">
                     <input type="text" placeholder="Nama Barang / Warung" value={newTrx.name} onChange={e=>setNewTrx({...newTrx, name: e.target.value})} className="flex-1 p-3 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black" required />
                     <input type="number" placeholder="Nominal (Rp)" value={newTrx.amount} onChange={e=>setNewTrx({...newTrx, amount: e.target.value})} className="w-1/3 p-3 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black" required />
                   </div>
                   <button type="submit" className="w-full py-3 mt-1 dark:bg-emerald-600 bg-emerald-500 text-white rounded-xl text-xs font-bold active:scale-[0.98] transition-transform shadow-sm">
                     Catat ke Daftar Dosa!
                   </button>
                 </form>
               )}

               <div className="rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm overflow-hidden divide-y dark:divide-white/5 divide-black/5">
                 {filteredTransactions.length === 0 && (
                    <p className="p-6 text-sm dark:text-gray-500 text-gray-400 text-center">Tumben nggak ada dosa di kategori ini. Hebat!</p>
                 )}
                 {filteredTransactions.map((trx) => (
                   <div key={trx.id} className="p-4 px-5 transition-colors hover:dark:bg-white/5 hover:bg-black/5">
                     {editingTrxId === trx.id ? (
                       <div className="flex flex-col gap-2">
                         <div className="flex gap-2">
                           <input type="date" value={editTrxForm.date} onChange={e=>setEditTrxForm({...editTrxForm, date: e.target.value})} className="w-1/3 p-2 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black [color-scheme:dark]" />
                           <select value={editTrxForm.category} onChange={e=>setEditTrxForm({...editTrxForm, category: e.target.value})} className="flex-1 p-2 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black">
                             <option value="Makan & Minum">Makan & Minum</option>
                             <option value="E-Commerce">E-Commerce</option>
                             <option value="Tagihan & Digital">Tagihan & Digital</option>
                             <option value="Transportasi">Transportasi</option>
                             <option value="Lainnya">Lainnya</option>
                           </select>
                         </div>
                         <div className="flex gap-2">
                           <input type="text" value={editTrxForm.name} onChange={e=>setEditTrxForm({...editTrxForm, name: e.target.value})} className="flex-1 p-2 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black" />
                           <input type="number" value={editTrxForm.amount} onChange={e=>setEditTrxForm({...editTrxForm, amount: e.target.value})} className="w-1/3 p-2 rounded-xl text-xs outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-black" />
                         </div>
                         <button onClick={()=>saveEditTrx(trx.id)} className="w-full py-2 dark:bg-emerald-600 bg-emerald-500 text-white rounded-xl text-xs font-bold">Simpan Revisi Dosa</button>
                       </div>
                     ) : (
                       <div className="flex justify-between items-center">
                         <div>
                           <p className="text-sm font-semibold dark:text-white text-gray-900">{trx.name}</p>
                           <p className="text-[11px] dark:text-gray-500 text-gray-400 mt-0.5">{new Date(trx.date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})} • {trx.category}</p>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className="font-bold text-sm dark:text-white text-black">{formatIDR(trx.amount)}</span>
                           <div className="flex flex-col gap-1 ml-2 border-l pl-3 dark:border-gray-700 border-gray-200">
                              <button onClick={()=>startEditTrx(trx)} className="p-1 rounded dark:text-gray-400 text-gray-500 hover:text-blue-500"><Icon name="edit" className="w-3.5 h-3.5" /></button>
                              <button onClick={()=>deleteTrx(trx.id)} className="p-1 rounded dark:text-gray-400 text-gray-500 hover:text-rose-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
             <div className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col gap-3">
               <p className="text-sm font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide">Update Saldo Hari Ini</p>
               <form onSubmit={handleUpdateBalance} className="flex gap-2">
                 <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="w-1/3 p-4 rounded-2xl text-sm outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-gray-900 [color-scheme:dark]" required />
                 <input type="number" placeholder="Sisa Saldo (Rp)" value={todayInput} onChange={(e) => setTodayInput(e.target.value)} className="flex-1 p-4 rounded-2xl text-sm outline-none dark:bg-[#2c2c2e] bg-gray-100 dark:text-white text-gray-900" required />
                 <button type="submit" className="px-4 dark:bg-blue-600 bg-blue-500 text-white rounded-2xl font-bold shadow-sm active:scale-95 transition-transform"><Icon name="check" /></button>
               </form>
             </div>

             <div>
                <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-3 px-2 uppercase tracking-wide">Rekap Pengeluaran Harian</h3>
                <div className="rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm overflow-hidden divide-y dark:divide-white/5 divide-black/5">
                   {dailyRecaps.map(recap => (
                     <div key={recap.id} className="p-4 px-5">
                       {editingBalanceId === recap.id ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                               <input type="date" value={editBalanceForm.date} onChange={e=>setEditBalanceForm({...editBalanceForm, date: e.target.value})} className="w-1/3 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black [color-scheme:dark]" />
                               <input type="number" value={editBalanceForm.balance} onChange={e=>setEditBalanceForm({...editBalanceForm, balance: e.target.value})} className="flex-1 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black" />
                            </div>
                            <button onClick={()=>saveEditBalance(recap.id)} className="w-full py-2 dark:bg-blue-600 bg-blue-500 text-white rounded-xl text-xs font-bold">Simpan Perubahan</button>
                          </div>
                       ) : (
                         <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold dark:text-white text-gray-900 text-sm">{new Date(recap.date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</p>
                              <p className="text-[11px] dark:text-gray-500 text-gray-400 mt-0.5">Saldo: {formatIDR(recap.balance)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {recap.hasOlderData ? (
                                 <span className={`font-bold text-sm ${recap.isIncome ? 'dark:text-emerald-400 text-emerald-600' : 'dark:text-rose-400 text-rose-600'}`}>
                                   {recap.isIncome ? '+' : '-'}{formatIDR(recap.expense)}
                                 </span>
                              ) : (
                                 <span className="text-[11px] font-medium dark:text-gray-500 text-gray-400 italic">Data Awal</span>
                              )}
                              <div className="flex flex-col gap-1 ml-2 border-l pl-3 dark:border-gray-700 border-gray-200">
                                <button onClick={()=>startEditBalance(recap)} className="p-1 rounded dark:text-gray-400 text-gray-500 hover:text-blue-500"><Icon name="edit" className="w-3.5 h-3.5" /></button>
                                <button onClick={()=>deleteBalance(recap.id)} className="p-1 rounded dark:text-gray-400 text-gray-500 hover:text-rose-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                         </div>
                       )}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  // 3. Electricity View
  const ElectricityView = () => {
    const [newDate, setNewDate] = useState(formatDate(new Date()));
    const [newKwh, setNewKwh] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ date: '', kwh: '' });

    const handleAddRecord = (e) => {
      e.preventDefault();
      if (!newDate || !newKwh) return;
      const item = { id: Date.now(), date: newDate, kwh: parseFloat(newKwh) };
      setElectricityHistory([item, ...electricityHistory]);
      setNewKwh('');
      triggerToast("Sip, data meteran kecatet.");
    };

    const startEdit = (record) => {
      setEditingId(record.id);
      setEditForm({ date: record.date, kwh: record.kwh });
    };

    const saveEdit = (id) => {
      setElectricityHistory(prev => prev.map(item =>
        item.id === id ? { ...item, date: editForm.date, kwh: parseFloat(editForm.kwh) } : item
      ));
      setEditingId(null);
    };

    const deleteRecord = (id) => setElectricityHistory(prev => prev.filter(item => item.id !== id));

    return (
      <div className="p-6 space-y-6 animate-fade-in pb-32">
        <header className="pt-4 pb-2">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 tracking-tight">Listrik Kos</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Biar nggak mati listrik pas lagi mandi.</p>
        </header>

        <div className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col items-center justify-center text-center border-2 border-amber-500/20">
          <p className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-2 uppercase tracking-wide">Prediksi Habis</p>
          <div className="text-6xl font-extrabold dark:text-amber-400 text-amber-500 tracking-tighter mb-4">
            {elecStats.daysLeft} <span className="text-xl font-medium text-gray-500 tracking-normal">Hari</span>
          </div>
          <div className="flex gap-4 text-xs dark:text-gray-400 text-gray-500 font-medium bg-gray-100 dark:bg-[#2c2c2e] px-4 py-2.5 rounded-full">
             <div className="flex items-center gap-1.5"><Icon name="zap" className="w-3.5 h-3.5 text-amber-500" /> Rata-rata: <span className="dark:text-white text-black">{elecStats.avg.toFixed(2)} kWh/hari</span></div>
          </div>
        </div>

        <form onSubmit={handleAddRecord} className="flex gap-2">
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-1/3 p-4 dark:bg-[#1c1c1e] bg-white shadow-sm rounded-2xl text-sm outline-none dark:text-white text-gray-900 [color-scheme:dark]" required />
          <input type="number" placeholder="Sisa kWh" value={newKwh} onChange={(e) => setNewKwh(e.target.value)} step="0.1" className="flex-1 p-4 dark:bg-[#1c1c1e] bg-white shadow-sm rounded-2xl text-sm outline-none dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400" required />
          <button type="submit" className="px-5 dark:bg-amber-600 bg-amber-500 text-white rounded-2xl font-bold shadow-sm active:scale-95 transition-transform"><Icon name="plus" /></button>
        </form>

        <div>
          <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-3 px-2 uppercase tracking-wide">Riwayat Cek Meteran</h3>
          <div className="rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm overflow-hidden divide-y dark:divide-white/5 divide-black/5">
            {electricityHistory.length === 0 && <p className="p-6 text-sm dark:text-gray-500 text-gray-400 text-center">Belum ada data, coba cek meteran sana.</p>}
            {electricityHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => (
              <div key={record.id} className="p-4 px-5">
                {editingId === record.id ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input type="date" value={editForm.date} onChange={e=>setEditForm({...editForm, date: e.target.value})} className="w-1/3 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black [color-scheme:dark]" />
                      <input type="number" value={editForm.kwh} onChange={e=>setEditForm({...editForm, kwh: e.target.value})} step="0.1" className="flex-1 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black" />
                    </div>
                    <button onClick={()=>saveEdit(record.id)} className="w-full py-2 dark:bg-emerald-600 bg-emerald-500 text-white rounded-xl text-xs font-bold">Simpan</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-sm dark:text-white text-gray-900 font-semibold">{new Date(record.date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-bold dark:text-amber-400 text-amber-600">{record.kwh} kWh</span>
                      <div className="flex gap-2.5">
                        <button onClick={()=>startEdit(record)} className="p-1.5 rounded-md dark:bg-[#2c2c2e] bg-gray-100 dark:text-gray-400 text-gray-500 hover:text-blue-500"><Icon name="edit" className="w-3.5 h-3.5" /></button>
                        <button onClick={()=>deleteRecord(record.id)} className="p-1.5 rounded-md dark:bg-[#2c2c2e] bg-gray-100 dark:text-gray-400 text-gray-500 hover:text-rose-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 4. Impulse View (Guilt-trip Edition)
  const ImpulseView = () => {
    const [newItem, setNewItem] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', price: '', date: '' });

    const totalWasted = impulseLogs.reduce((acc, item) => acc + item.price, 0);

    const handleAddImpulse = (e) => {
      e.preventDefault();
      if (!newItem || !newPrice) return;
      const item = { id: Date.now(), name: newItem, price: parseFloat(newPrice), date: formatDate(new Date()) };
      setImpulseLogs([item, ...impulseLogs]);
      setNewItem(''); setNewPrice('');
      triggerToast("Bagus, catat kebodohanmu hari ini.");
    };

    const startEdit = (record) => {
      setEditingId(record.id);
      setEditForm({ name: record.name, price: record.price, date: record.date });
    };

    const saveEdit = (id) => {
      setImpulseLogs(prev => prev.map(item => 
        item.id === id ? { ...item, name: editForm.name, price: parseFloat(editForm.price), date: editForm.date } : item
      ));
      setEditingId(null);
    };

    const deleteRecord = (id) => setImpulseLogs(prev => prev.filter(item => item.id !== id));

    return (
      <div className="p-6 space-y-6 animate-fade-in pb-32">
        <header className="pt-4 pb-2">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 tracking-tight">Penyesalan</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Mencatat barang gak penting yang kamu beli.</p>
        </header>

        <div className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm flex flex-col items-center text-center border-2 border-rose-500/20">
          <p className="dark:text-gray-400 text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">Uang yang gagal ditabung bulan ini</p>
          <div className="text-4xl font-extrabold dark:text-rose-400 text-rose-500 tracking-tighter">{formatIDR(totalWasted)}</div>
        </div>

        <form onSubmit={handleAddImpulse} className="space-y-3">
          <input type="text" placeholder="Nama Barang (Cth: Beli Kopi Mahal)" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full p-4 dark:bg-[#1c1c1e] bg-white shadow-sm rounded-2xl text-sm outline-none dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400" required />
          <input type="number" placeholder="Harganya berapa? (Rp)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full p-4 dark:bg-[#1c1c1e] bg-white shadow-sm rounded-2xl text-sm outline-none dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400" required />
          <button type="submit" className="w-full py-4 dark:bg-rose-600 bg-rose-500 text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-transform shadow-sm flex justify-center items-center gap-2">
            Catat & Sesali!
          </button>
        </form>

        <div>
          <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-3 px-2 uppercase tracking-wide">Riwayat Khilaf</h3>
          <div className="rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm overflow-hidden divide-y dark:divide-white/5 divide-black/5">
            {impulseLogs.length === 0 && <p className="p-6 text-sm dark:text-gray-500 text-gray-400 text-center">Masih aman, belum ada jajan aneh-aneh!</p>}
            {impulseLogs.map(log => (
              <div key={log.id} className="p-4 px-5">
                {editingId === log.id ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                       <input type="date" value={editForm.date} onChange={e=>setEditForm({...editForm, date: e.target.value})} className="w-1/3 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black [color-scheme:dark]" />
                       <input type="text" value={editForm.name} onChange={e=>setEditForm({...editForm, name: e.target.value})} className="flex-1 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black" />
                    </div>
                    <div className="flex gap-2">
                       <input type="number" value={editForm.price} onChange={e=>setEditForm({...editForm, price: e.target.value})} className="flex-1 p-2 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl text-xs outline-none dark:text-white text-black" />
                       <button onClick={()=>saveEdit(log.id)} className="px-4 py-2 dark:bg-emerald-600 bg-emerald-500 text-white rounded-xl text-xs font-bold">Simpan</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold dark:text-white text-gray-900 text-sm">{log.name}</p>
                      <p className="text-[11px] dark:text-gray-500 text-gray-400 mt-0.5">{new Date(log.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold dark:text-rose-400 text-rose-600 text-sm">-{formatIDR(log.price)}</span>
                      <div className="flex gap-2.5">
                        <button onClick={()=>startEdit(log)} className="p-1.5 rounded-md dark:bg-[#2c2c2e] bg-gray-100 dark:text-gray-400 text-gray-500 hover:text-blue-500"><Icon name="edit" className="w-3.5 h-3.5" /></button>
                        <button onClick={()=>deleteRecord(log.id)} className="p-1.5 rounded-md dark:bg-[#2c2c2e] bg-gray-100 dark:text-gray-400 text-gray-500 hover:text-rose-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 5. Tools & Settings View
  const ToolsView = () => {
    const [itemPrice, setItemPrice] = useState('');
    const dailyWage = (profile.salary + (profile.bonus || 0)) / 22; 
    const workDaysNeeded = itemPrice ? (parseFloat(itemPrice) / dailyWage).toFixed(1) : 0;

    return (
      <div className="p-6 space-y-6 animate-fade-in pb-32">
        <header className="pt-4 pb-2">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 tracking-tight">Tools</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Realita kehidupan pekerja kantoran.</p>
        </header>
        
        {/* Survival Month (Emergency Fund) */}
        <section className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm">
          <h3 className="font-semibold dark:text-gray-400 text-gray-500 mb-4 text-sm">Kekuatan Dana Darurat</h3>
          <div className="mb-5 flex flex-col items-center">
            <p className="text-xs dark:text-gray-500 text-gray-400 mb-2">Bisa bertahan kalau di-PHK:</p>
            <div className="text-6xl font-extrabold dark:text-white text-black tracking-tighter">
              {survivalMonths} <span className="text-xl font-medium text-gray-500 tracking-normal">bln</span>
            </div>
          </div>
          <div className="dark:bg-[#2c2c2e] bg-gray-100 p-4 rounded-2xl text-xs dark:text-gray-400 text-gray-600 space-y-2.5">
            <div className="flex justify-between"><span>Tabungan Darurat (Manual):</span> <b className="dark:text-white text-black">{formatIDR(profile.emergencySavings)}</b></div>
            <div className="flex justify-between"><span>Rata2 Pengeluaran/bln (Auto):</span> <b className="dark:text-white text-black">{formatIDR(estimatedMonthlyExpense)}</b></div>
          </div>
        </section>

        {/* Wage Converter */}
        <section className="p-6 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm">
          <h3 className="font-semibold dark:text-gray-400 text-gray-500 mb-2 text-sm">Kalkulator Harga Waktu</h3>
          <p className="text-xs dark:text-gray-500 text-gray-400 mb-5 leading-relaxed">Yakin mau beli barang mahal? Cek dulu berapa hari lo harus banting tulang buat nebus barang ini.</p>
          
          <input 
            type="number" 
            placeholder="Masukin Harga Barang (Rp)" 
            value={itemPrice} 
            onChange={(e) => setItemPrice(e.target.value)} 
            className="w-full p-4 mb-4 dark:bg-[#2c2c2e] bg-gray-100 rounded-2xl text-sm outline-none dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400" 
          />
          
          {itemPrice > 0 && (
            <div className="p-5 dark:bg-orange-500/10 bg-orange-50 rounded-2xl flex justify-between items-center">
              <p className="text-xs dark:text-orange-400/80 text-orange-600 font-medium">Lama jadi budak korporat:</p>
              <div className="text-3xl font-extrabold dark:text-orange-400 text-orange-600 tracking-tighter">{workDaysNeeded} <span className="text-sm font-medium">Hari</span></div>
            </div>
          )}
        </section>

        {/* Settings */}
        <section className="mt-8">
           <h3 className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-3 px-2 uppercase tracking-wide">Pengaturan Profil</h3>
           <div className="p-5 rounded-[2rem] dark:bg-[#1c1c1e] bg-white shadow-sm space-y-4">
              <div>
                 <label className="block text-xs font-semibold dark:text-gray-400 text-gray-500 mb-2 px-1">Gaji Pokok Bulanan</label>
                 <input type="number" value={profile.salary} onChange={(e)=>setProfile({...profile, salary: Number(e.target.value)})} className="w-full p-3.5 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl outline-none dark:text-white text-gray-900 text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-semibold dark:text-gray-400 text-gray-500 mb-2 px-1">Bonus / Tambahan Bulan Ini</label>
                 <input type="number" value={profile.bonus} onChange={(e)=>setProfile({...profile, bonus: Number(e.target.value)})} className="w-full p-3.5 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl outline-none dark:text-white text-gray-900 text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-semibold dark:text-gray-400 text-gray-500 mb-2 px-1">Total Dana Darurat Saat Ini</label>
                 <input type="number" value={profile.emergencySavings} onChange={(e)=>setProfile({...profile, emergencySavings: Number(e.target.value)})} className="w-full p-3.5 dark:bg-[#2c2c2e] bg-gray-100 rounded-xl outline-none dark:text-white text-gray-900 text-sm" />
              </div>
           </div>
        </section>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'keuangan': return <KeuanganView />;
      case 'electricity': return <ElectricityView />;
      case 'impulse': return <ImpulseView />;
      case 'tools': return <ToolsView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="w-full max-w-md h-[100dvh] mx-auto dark:bg-black bg-[#f2f2f7] relative overflow-hidden flex flex-col font-sans sm:rounded-[2.5rem] sm:border-[8px] sm:border-gray-900 sm:h-[90vh] sm:my-8 sm:shadow-2xl transition-colors duration-300">
        
        {/* Toast Notification */}
        {showToast && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 dark:bg-[#2c2c2e] bg-gray-800 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xl animate-fade-in whitespace-nowrap">
            {showToast}
          </div>
        )}

        {/* Top Header / Theme Toggle */}
        <div className="px-6 pt-12 pb-4 flex justify-between items-center z-20 dark:bg-black/80 bg-[#f2f2f7]/80 backdrop-blur-xl sticky top-0">
           <div className="font-bold text-xl tracking-tight dark:text-white text-black">AnakKos<span className="text-blue-500">.</span></div>
           <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-full dark:bg-[#1c1c1e] bg-white shadow-sm dark:text-amber-400 text-gray-500 active:scale-95 transition-all">
             {isDark ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
           </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 dark:bg-[#1c1c1e]/90 bg-white/90 backdrop-blur-2xl border-t dark:border-white/10 border-black/5 px-2 py-3 z-40 pb-safe">
          <div className="grid grid-cols-5 w-full">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'home' ? 'dark:text-white text-black' : 'dark:text-gray-500 text-gray-400'}`}>
              <Icon name="home" className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button onClick={() => setActiveTab('keuangan')} className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'keuangan' ? 'dark:text-white text-black' : 'dark:text-gray-500 text-gray-400'}`}>
              <Icon name="wallet" className="w-6 h-6" />
              <span className="text-[10px] font-medium">Keuangan</span>
            </button>
            <button onClick={() => setActiveTab('electricity')} className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'electricity' ? 'dark:text-white text-black' : 'dark:text-gray-500 text-gray-400'}`}>
              <Icon name="zap" className="w-6 h-6" />
              <span className="text-[10px] font-medium">Listrik</span>
            </button>
            <button onClick={() => setActiveTab('impulse')} className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'impulse' ? 'dark:text-white text-black' : 'dark:text-gray-500 text-gray-400'}`}>
              <Icon name="bag" className="w-6 h-6" />
              <span className="text-[10px] font-medium">Penyesalan</span>
            </button>
            <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'tools' ? 'dark:text-white text-black' : 'dark:text-gray-500 text-gray-400'}`}>
              <Icon name="tools" className="w-6 h-6" />
              <span className="text-[10px] font-medium">Tools</span>
            </button>
          </div>
        </nav>

        <style dangerouslySetInnerHTML={{
          __html: `
          .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
          input[type='date']::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
          .dark input[type='date']::-webkit-calendar-picker-indicator { filter: invert(1); }
          .pb-safe { padding-bottom: calc(1rem + env(safe-area-inset-bottom)); }
          `
        }} />
      </div>
    </div>
  );
}