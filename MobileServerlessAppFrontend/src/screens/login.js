import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-datepicker';
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
                <Text style={styles.welcome}>Welcome to this App!</Text>
                <Text style={styles.instructions}>To get started, sign in</Text>
                <TextInput editable={!this.props.loadingAuth} placeholder="email" value={this.props.email} onChangeText={email => this.props.modificaEmail(email)} />
                <TextInput editable={!this.props.loadingAuth} placeholder="password" secureTextEntry={true} value={this.props.password} onChangeText={password => this.props.modificaSenha(password)} /> 
                
                {
                    this.props.loadingAuth ? (
                        <ActivityIndicator size="large" />
                    ) : (
                            <View>
                                <Button title="Login" disabled={!this.validateForm()} onPress={() => { this.login() }} />
                                <Button title="Cadastro" disabled={!this.validateForm()} onPress={() => { this.props.navigation.navigate('cadastro') }} />
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
        backgroundColor: '#F5FCFF',
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