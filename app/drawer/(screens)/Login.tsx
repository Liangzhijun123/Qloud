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
    setIsSuccess(false);

    // Hardcoded mock user account for testing purposes
    const mockUser = {
      email: "testuser@example.com",
      password: "TestPassword123",
      token: "mockToken123456", // This is a dummy token for testing
    };

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Check if the entered credentials match the mock user
    if (email === mockUser.email && password === mockUser.password) {
      // Simulate successful login with the mock user
      const userData = {
        token: mockUser.token,
      };

      Alert.alert("Success", "Logged in successfully with the temporary account!");
      router.replace("/drawer/(tabs)/Home"); // Navigate to Home on successful login
      setLoginError(false);
    } else {
      // If credentials don't match, proceed with real sign-in API call
      try {
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>App Logo</Text>
      <Text style={styles.welcomeText}>{isSignUp ? "Sign Up" : "Login"}</Text>
      <Text style={styles.subtitle}>Please enter your credentials below</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      {loginError && (
        <Text style={styles.errorText}>Invalid credentials, please try again.</Text>
      )}

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.forgotPassword}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
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
