import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { forgotPassword } from "../../services/apiService";
import { signIn, signUp } from "../../services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState(""); // New state for First Name
  const [lastname, setLastname] = useState(""); // New state for Last Name
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup
  const [loginError, setLoginError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignIn = async () => {
    debugger;
    setIsSuccess(false);

    const mockUser = {
      email: "testuser@example.com",
      password: "TestPassword123",
      token: "mockToken123456", 
    };

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    

    try {
      debugger;
      const userData = await signIn(email, password); // Call API
      console.log("User signed in:", userData);

      Alert.alert("Success", "Logged in successfully!");
      if (userData.token) {
        router.replace("/drawer/(tabs)/Home"); // Navigate to Home on successful login
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
      Alert.alert("Error", "Login failed!");
    }
  };

  const createAccount = async () => {
    setIsSignUp(true);
  }

  const handleSignUp = async () => {
    debugger;
    // setIsSignUp(true); // Toggle to show sign-up fields
    if (isSignUp) {
      try {
        debugger;
        const userData = await signUp(email, password, firstname, lastname); // Call API
        console.log("User signed in:", userData);

        Alert.alert("Success", "Logged in successfully!");
        if (userData.status == "success") {
          Alert.alert("Error", "User"+firstname+" created successfully Please Login in Now");
          setIsSignUp(false)
          setIsSuccess(true)
          setLoginError(false);
        } else {
          setLoginError(true);
        }
      } catch (error) {
        setLoginError(true);
        Alert.alert("Error", "Login failed!");
      }

    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset password.");
      return;
    }

    try {
      await forgotPassword(email);
      Alert.alert("Success", "Password reset link sent.");
    } catch (error) {

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>QLOUD</Text>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subtitle}>We’re excited to see you again!</Text>

      <Text style={styles.label}>Enter credentials to log in</Text>

      {isSignUp && (
        <View style={styles.signUpFields}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastname}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      
      {!setPassword  && <Text style={styles.errorText}>Password missing,please enter password to login</Text>}
      {!setEmail  && <Text style={styles.errorText}> Email missing,please enter email to login</Text>}

      {loginError && <Text style={styles.errorText}>Login Failed</Text>}
      {isSuccess  && <Text style={styles.successText}>User {firstname} added successfully , Please login now </Text>}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      {!isSignUp && <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Log In</Text>
      </TouchableOpacity>}

      {!isSignUp&&<Text style={styles.orText}>or</Text>}

      {/* Toggle between "Create Account" and "Sign Up" */}
      {isSignUp && <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
        <Text style={styles.signInButtonText}>
          {"Sign Up"}
        </Text>
      </TouchableOpacity>}
      {!isSignUp && <TouchableOpacity style={styles.signInButton} onPress={createAccount}>
        <Text style={styles.signInButtonText}>
          {"Create Account"}
        </Text>
      </TouchableOpacity>}


      {/* <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.socialText}>Continue With Facebook</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#1E90FF",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginBottom: 10,
  },
  googleText: {
    color: "black",
    fontWeight: "bold",
  },
  facebookButton: {
    width: "100%",
    backgroundColor: "#1877F2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  socialText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signUpFields: {
    width: "100%",
    marginTop: 20,
  },
});

export default Login;
