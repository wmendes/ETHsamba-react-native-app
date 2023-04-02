import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import { H1, H2, H3, H4, H5, H6 } from "../components/Headings";
import MonoText from "../components/MonoText";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

const Docs = () => {
    return (
        <View
            style={{
                height: "100%",
                padding: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                }}
            >
                <Container style={{ marginTop: 15 }}>
                    <MonoText
                        additionalStyles={{
                            textAlign: "center",
                            color: Colors.brand.brown,
                            fontSize: 13,
                        }}
                    >
                        {
                            "Você ainda não tem nenhuma gema. Vai viver a vida e volte aqui depois."
                        }
                    </MonoText>
                </Container>
            </View>
        </View>
    );
};

export default Docs;
