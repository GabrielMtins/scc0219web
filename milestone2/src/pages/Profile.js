import '../palette.css';
import './Profile.css';

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { useEffect, useState } from 'react';

// --- DADOS DE EXEMPLO ---
// <<< MUDANÇA: Adicionado 'orderId' para um visual mais completo >>>
const mockPurchaseHistory = [
  { id: 'compra-001', orderId: '#BR2025-A5C1', date: '15/05/2025', total: 199.90, items: [{ name: 'Fone de Ouvido Bluetooth', quantity: 1 }, { name: 'Capa para Celular', quantity: 1 }] },
  { id: 'compra-002', orderId: '#BR2025-B8F2', date: '10/06/2025', total: 89.90, items: [{ name: 'Mouse sem Fio', quantity: 1 }] },
  { id: 'compra-003', orderId: '#BR2025-C9G3', date: '18/06/2025', total: 350.00, items: [{ name: 'Teclado Mecânico RGB', quantity: 1 }] },
  { id: 'compra-004', orderId: '#BR2025-D1H4', date: '19/06/2025', total: 75.50, items: [{ name: 'Cabo USB-C 2m', quantity: 2 }] },
  // Adicionei mais pedidos para forçar a barra de rolagem a aparecer
  { id: 'compra-005', orderId: '#BR2024-E5J5', date: '22/01/2025', total: 1250.00, items: [{ name: 'Monitor 24 polegadas', quantity: 1 }] },
];
// -------------------------

function ProfilePage() {
	// ... (O resto do componente ProfilePage continua exatamente igual) ...
	// ... (Não é necessário colar tudo de novo, apenas a alteração no PurchaseItem)
	const { user, loading } = useLogin();
	const navigate = useNavigate();
	const purchaseHistory = mockPurchaseHistory;
	const [activeView, setActiveView] = useState('profile');

	useEffect(() => {
		if (!loading) {
			if (!user) navigate('/login');
			else if (user.username === 'admin') navigate('/admin');
		}
	}, [user, loading, navigate]);

	if (loading || !user) {
		return (
			<div className="profile-page"><div className="profile-card"><p className="loading-text">Carregando perfil...</p></div></div>
		);
	}

	return (
		<div className="profile-page">
			<div className="profile-card">
				<h1 className="profile-title">{activeView === 'profile' ? 'Minhas Informações' : 'Meus Pedidos'}</h1>
				<div className="profile-view-switcher">
					<button className={`switcher-btn ${activeView === 'profile' ? 'active' : ''}`} onClick={() => setActiveView('profile')}>Perfil</button>
					<button className={`switcher-btn ${activeView === 'history' ? 'active' : ''}`} onClick={() => setActiveView('history')}>Histórico</button>
				</div>
				<div className="profile-content">
					{activeView === 'profile' && (
						<div className="info-section">
							<ProfileField label="Nome Completo" value={user.fullname || 'Não informado'} />
							<ProfileField label="Nome de Usuário" value={user.username} />
							<ProfileField label="Email" value={user.email || 'Não informado'} />
							<ProfileField label="Endereço" value={user.address || 'Não informado'} />
							<ProfileField label="CEP" value={user.cep || 'Não informado'} />
						</div>
					)}
					{activeView === 'history' && (
						<div className="history-section">
							{purchaseHistory && purchaseHistory.length > 0 ? (
								<div className="purchase-list">
									{purchaseHistory.map((purchase) => <PurchaseItem key={purchase.id} purchase={purchase} />)}
								</div>
							) : (<p className="no-history-text">Você ainda não fez nenhuma compra.</p>)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}


function ProfileField({ label, value }) { /* ...código inalterado... */ 
	return (
		<div className="profile-field">
			<span className="field-label">{label}</span>
			<span className="field-value">{value}</span>
		</div>
	);
}

// <<< MUDANÇA: Componente PurchaseItem atualizado para usar 'orderId' >>>
function PurchaseItem({ purchase }) {
	const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(purchase.total);
	return (
	  <div className="purchase-item">
		<div className="purchase-header">
		  <div className="purchase-identity">
			<span className="purchase-id">{purchase.orderId}</span>
			<span className="purchase-date">{purchase.date}</span>
		  </div>
		</div>
		<div className="purchase-body">
		  {/* Opcional: remover a palavra "Itens" para um visual mais limpo */}
		  <ul>{purchase.items.map((item, index) => <li key={index}>{item.quantity}x {item.name}</li>)}</ul>
		</div>
		<div className="purchase-footer">
		  <span className="purchase-total-label">Total</span>
		  <span className="purchase-total">{formattedTotal}</span>
		</div>
	  </div>
	);
}

export default ProfilePage;