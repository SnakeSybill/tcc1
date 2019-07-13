import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-material-ui';
import { connect } from 'react-redux';
import {
    loginUsuario, modificaLoading
} from './../actions/authenticationActions';
import { modificaSenha, modificaEmail } from './../actions/appActions';

class Login extends Component {

    static navigationOptions = {
        title: 'login',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    validateForm() {
        return this.props.email.length > 0 && this.props.password.length > 0;
    }

    login() {
        console.log("Clicou em login");
        this.props.modificaLoading(true);
        this.props.loginUsuario(this.props.email, this.props.password, this.props.navigation);
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 3, justifyContent: 'flex-end', alignContent: "flex-end"}}>
                    <Icon name="people" size={150} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.welcome}>Reuniões Corporativas</Text>
                    <Text style={styles.instructions}>Entre ou cadastre-se para começar</Text>
                </View>
                <View style={{ flex: 3, width: 250, justifyContent: 'center', }}>
                    <TextInput editable={!this.props.loadingAuth} placeholder="E-mail" value={this.props.email} onChangeText={email => this.props.modificaEmail(email)} />
                    <Divider />
                    <TextInput editable={!this.props.loadingAuth} placeholder="Password" secureTextEntry={true} value={this.props.password} onChangeText={password => this.props.modificaSenha(password)} />
                </View>
                {
                    this.props.loadingAuth ? (
                        <ActivityIndicator size="large" />
                    ) : (
                            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: 100 }}>
                                <Button title="Login" color="#000" disabled={!this.validateForm()} onPress={() => { this.login() }} />
                                <Button title="Cadastro" color="#AAA" onPress={() => { this.props.navigation.navigate('cadastro') }} />
                            </View>
                        )
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = state => (
    {
        password: state.appReducer.password,
        email: state.appReducer.email,
        loadingAuth: state.authenticationReducer.loadingAuth,
    }
)

export default connect(mapStateToProps,
    {
        modificaSenha,
        modificaEmail,
        loginUsuario,
        modificaLoading
    })(Login);