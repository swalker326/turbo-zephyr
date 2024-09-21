import { Link, Outlet } from "react-router-dom";

export function Component() {
	return (
		<div style={{ display: "flex" }}>
			<div style={{ height: "100%", width: "10rem" }}>
				<ul>
					<Link to="/">Home</Link>
				</ul>
				<ul>
					<Link to="/feed">Feed</Link>
				</ul>
			</div>
			<Outlet />
		</div>
	);
}
