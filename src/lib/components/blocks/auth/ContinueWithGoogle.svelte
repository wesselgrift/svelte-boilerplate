<script>
	// Auth and Firestore
	import { loginWithGoogle } from '$lib/firebase/auth';
	import { setDocument } from '$lib/firebase/firestore';

	// Components
	import Button from '$lib/components/parts/Button.svelte';

	async function handleGoogleLogin() {
		try {
			// Login with Google
			const userCredential = await loginWithGoogle();

			// Get the userID, email and name
			const user = userCredential.user;
			const userId = user.uid;
			const email = user.email;
			const displayName = user.displayName || '';
			const [firstName, lastName] = displayName.split(' ');

			// Set the user document in Firestore
			await setDocument('users', userId, {
				firstName: firstName,
				lastName: lastName,
				email: email
			});

		} catch (err) {
			console.error(err.message);
		}
	}
</script>

<div>
	<Button variant="outline" onclick={handleGoogleLogin}>
		<img src="/google-icon.svg" alt="Google" class="size-5" />
		Continue with Google
	</Button>
</div>
