import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as rootRoute from "./root";

const router = createBrowserRouter(
	[
		{
			...rootRoute,
			id: "root",
			path: "/",
			children: [
				{
					id: "home",
					index: true,
					lazy: () => import("./routes/home"),
				},
			],
		},
	],
	{
		future: {
			v7_normalizeFormMethod: true,
		},

		async unstable_patchRoutesOnNavigation({ path, matches, patch }) {
			if (path.startsWith("/feed")) {
				//@ts-expect-error - This is a dynamic import
				const { routes } = await import("feed/routes");
				patch("root", routes);
			}
			// TODO: Add more remotes here
		},
	},
);

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootEl);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
