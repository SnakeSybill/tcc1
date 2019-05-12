import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class Rodape extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.pagina) {
            case "inicio":
                return (
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('contatos')}
                            title="Contatos"
                            color="#000"
                            style={{ heigth: 30 }}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('eventos')}
                            title="Eventos"
                            color="#000"
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('convites')}
                            title="Convites"
                            color="#000"
                        />
                    </View>
                );
            case "eventos":
                return (
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('inicio')}
                            title="Agenda"
                            color="#000"
                            style={{ heigth: 30 }}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('contatos')}
                            title="Contatos"
                            color="#000"
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('convites')}
                            title="Convites"
                            color="#000"
                        />

                        <Button
                            title="Adicionar"
                            style={{ marginBottom: 10, }}
                            onPress={() => this.props.navigation.navigate('addevento')} />
                    </View>
                );
            case "contatos":
                return (
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('inicio')}
                            title="Agenda"
                            color="#000"
                            style={{ heigth: 30 }}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('eventos')}
                            title="Eventos"
                            color="#000"
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('convites')}
                            title="Convites"
                            color="#000"
                        />

                        <Button
                            title="Adicionar"
                            style={{ marginBottom: 10, }}
                            onPress={() => this.props.navigation.navigate('addcontato')} />
                    </View>
                );
            case "convites":
                return (
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('inicio')}
                            title="Agenda"
                            color="#000"
                            style={{ heigth: 30 }}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('eventos')}
                            title="Eventos"
                            color="#000"
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('contatos')}
                            title="Contatos"
                            color="#000"
                        />
                    </View>
                );
            default: break
        }

    }
}