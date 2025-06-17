import '../palette.css';
import './Profile.css';

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { useEffect } from 'react';

function ProfilePage() {
  const { user, loading } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/login');
      else if (user.username === 'admin') navigate('/admin');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p className="loading-text">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Meu Perfil</h1>

        <ProfileField label="Nome Completo" value={user.fullname || 'Não informado'} />
        <ProfileField label="Nome de Usuário" value={user.username} />
        <ProfileField label="Email" value={user.email || 'Não informado'} />
		<ProfileField label="Endereço" value={user.address || 'Não informado'} />
		<ProfileField label="CEP" value={user.cep || 'Não informado'} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <span className="field-label">{label}</span>
      <span className="field-value">{value}</span>
    </div>
  );
}

export default ProfilePage;
