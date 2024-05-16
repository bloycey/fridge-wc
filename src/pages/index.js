import photo from "../images/photo_sketch.svg";
import bill from "../images/bills_sketch.svg";
import notes from "../images/notes_sketch.svg";
import logo from "../images/logo_white.svg";

import { supabase } from "../db/supabase";

export default class Index extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	connectedCallback() {
		const googleBtn = this.querySelector(".btn-google");
		googleBtn.addEventListener("click", async () => {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: import.meta.env.VITE_IS_DEV === "true" ? "http://localhost:5173/home/" : "https://onthefridge.lol/home/",
					queryParams: {
						prompt: 'select_account'
					},
				},
			})
			console.log("data", data)
			console.log("error", error)
		})
	}

	buildHTML() {
		return /*html*/`
			<main class="splash-screen w-full">
				<div class="h-full">
					<section class="inline-block relative w-full">
						<div class="absolute top-0 right-[3rem] animate-subtle-bounce">
							<p class="pill-accent translate-y-[1.5rem] -translate-x-[3.5rem]">Photos</p>
							<img src="${photo}" alt="Sketch of a photograph">
						</div>
						<div class="absolute top-[5rem] right-[8.5rem] animate-subtle-bounce" style="animation-delay: 0.3s">
							<p class="pill-accent translate-y-[0.75rem] -translate-x-[2.25rem]">Bills</p>
							<img src="${bill}" alt="Sketch of a bill">
						</div>
						<div class="notes-sketch absolute top-[6rem] right-[2rem] animate-subtle-bounce" style="animation-delay: 0.66s">
							<p class="pill-accent translate-y-[5.25rem] -translate-x-[2.5rem]">Notes</p>
							<img src="${notes}" alt="Sketch of notes">
						</div>
					</section>
					<section class="absolute top-1/3 left-0 right-0">
						<div class="flex items-center justify-center">
							<img src="${logo}" alt="Logo">
						</div>
						<div class="text-center border-b-2 border-pink">
							<p class="inline-block translate-y-1/2 px-4 bg-dark-green text-pink text-lg">Just put it on the fridge!</p>
						</div>
						<div class="text-white p-10 text-center">
							<p>The Fridge is a collaborative organisation app for couples, families, and share-houses.
							</p>
						</div>
					</section>
					<section class="fixed bottom-0 left-0 right-0 flex flex-col justify-end px-10 py-6">
						<h2 class="text-white mb-2 font-serif text-3xl text-center">Join for free, today</h2>
						<button provider="google" class="btn-google">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6">
								<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
								<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
								<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
								<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
								<path fill="none" d="M0 0h48v48H0z"></path>
							</svg>
							Sign in with Google
						</button>
					</section>
				</div>
			</main>
		`
	}
}

if (!customElements.get("fridge-page-index")) {
	customElements.define("fridge-page-index", Index);
}
