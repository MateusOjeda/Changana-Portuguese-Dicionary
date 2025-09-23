export function useLocalDate() {
	const hoje = new Date();

	return hoje.toLocaleDateString("pt-BR", {
		day: "numeric", // dia
		month: "long", // mês por extenso
	});
}
