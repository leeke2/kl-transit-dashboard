import { Component } from "react";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="absolute left-4 top-4 flex gap-x-3 border">
        <button className="rounded-3xl bg-indigo-800 px-4 py-2 text-white">
          Routes
        </button>
        <button className="rounded-3xl bg-indigo-800 px-4 py-2 text-white">
          Stops
        </button>
      </nav>
    );
  }
}
