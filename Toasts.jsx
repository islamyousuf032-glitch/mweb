import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Icon } from '../icons.jsx';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  const push = useCallback((msg, icon = 'bolt') => {
    const id = ++idRef.current;
    setItems((p) => [...p, { id, msg, icon, out: false }]);
    setTimeout(() => setItems((p) => p.map((t) => (t.id === id ? { ...t, out: true } : t))), 2600);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 3100);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="eu-toasts" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`eu-toast ${t.out ? 'out' : ''}`}>
            <span className="t-icon"><Icon name={t.icon} width="18" height="18" /></span>
            <span className="t-msg">{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
