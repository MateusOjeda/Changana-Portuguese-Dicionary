import { Text, View } from "react-native";

export default function NotFound() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ fontSize: 18, textAlign: "center" }}>
				Não foi possível encontrar a palavra. Se tiver interesse de
				colaborar com o dicionário, entre em contato com
				mateus.ojd@gmail.com
			</Text>
		</View>
	);
}
