import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "/feed",
		lazy: async () => {
			return { Component: (await import("./routes/feed")).default };
		},
		// children: [
		// 	{
		// 		index: true,
		// 		lazy: () => import("./routes/remote.index"),
		// 	},
		// 	{
		// 		path: "nested-remote-link",
		// 		lazy: () => import("./routes/remote.nested-remote-link"),
		// 	},
		// ],
	},
];
