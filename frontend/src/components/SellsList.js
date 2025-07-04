import React from 'react';
import "./SellsList.css"; 

const SellsList = ({ vendas }) => {
	if (!vendas || vendas.length === 0) {
		return (
			<section className="vendas-historico">
				<h2 className="section-title">Histórico de Vendas</h2>
				<p className="historico-vazio">Nenhum histórico de vendas disponível.</p>
			</section>
		);
	}

	const formatarData = (dataISO) => {
		if (!dataISO) return 'Data inválida';
		// Corrige potencial problema de fuso horário com datas YYYY-MM-DD
		const [year, month, day] = dataISO.split('-').map(Number);
		const dataObj = new Date(year, month - 1, day); // Mês é 0-indexado em Date

		return dataObj.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			timeZone: 'UTC', // Para garantir consistência na formatação da data
		});
	};

	// Ordena as vendas pela data mais recente primeiro
	const vendasOrdenadas = [...vendas].sort((a, b) => new Date(b.date) - new Date(a.date));

	return (
		<section className="vendas-historico">
			<h2 className="section-title">Histórico de Vendas</h2>
			<div className="historico-lista-container">
				{vendasOrdenadas.map((venda) => (
					<div key={venda.id} className="venda-card">
						<div className="venda-card-header">
							<span>Venda em: {formatarData(venda.date)}</span>
						</div>
						<div className="venda-card-body">
							<h3 className="venda-livro-titulo">{venda.livroTitulo}</h3>

							Detalhes da compra:
							{
								JSON.parse(venda.books).map((item) => (
									<p className="venda-detalhe">
										{item}
									</p>
								))
							}

							<p className="venda-detalhe">
								<span>Comprador: </span> {venda.buyer}
							</p>
						</div>
						<div className="venda-card-footer">
							<span>Total da Venda:</span>
							<strong>R$ {parseFloat(venda.price).toFixed(2)}</strong>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default SellsList;
