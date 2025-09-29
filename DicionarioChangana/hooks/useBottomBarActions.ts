import { Linking, Alert, Platform } from "react-native";
import { APP_CONFIG } from "../AppConfig.js";

export function useBottomBarActions() {
	const handleEmail = async () => {
		const url = `mailto:${APP_CONFIG.supportEmail}?subject=App Feedback&body=Olá, gostaria de compartilhar algumas ideias sobre o aplicativo:`;

		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(
				"Erro ao Abrir E-mail",
				`Por favor, envie um e-mail para ${APP_CONFIG.supportEmail}`
			);
		}
	};

	const handleDedicatory = () => {
		Alert.alert(
			"Dedicatória",
			"Scan do livro\nDicionário Português-Changana\nAutor. Bento Sitoe"
		);
	};

	const handleRateApp = async () => {
		let url = "";

		if (Platform.OS === "ios") {
			url = `itms-apps://itunes.apple.com/app/id${APP_CONFIG.iosAppStoreId}`;
		} else if (Platform.OS === "android") {
			url = `market://details?id=${APP_CONFIG.androidPackageName}`;
		} else {
			Alert.alert(
				"Plataforma não Suportada",
				"Não é possível avaliar nesta plataforma."
			);
			return;
		}

		const fallbackUrl = `https://play.google.com/store/apps/details?id=${APP_CONFIG.androidPackageName}`;

		try {
			if (await Linking.canOpenURL(url)) {
				await Linking.openURL(url);
			} else if (
				Platform.OS === "android" &&
				(await Linking.canOpenURL(fallbackUrl))
			) {
				await Linking.openURL(fallbackUrl);
			} else {
				Alert.alert(
					"Erro de Link",
					"Não foi possível abrir a loja de aplicativos. Verifique o ID/Package Name."
				);
			}
		} catch (e) {
			console.error("Linking error:", e);
			Alert.alert(
				"Erro de Conexão",
				"Verifique sua conexão e tente novamente."
			);
		}
	};

	return { handleEmail, handleDedicatory, handleRateApp };
}
