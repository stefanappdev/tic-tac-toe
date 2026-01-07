"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Gameboard_tsx_1 = __importDefault(require("./components/Gameboard.tsx"));
require("./styles/App.css");
function App() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { id: 'App', children: [(0, jsx_runtime_1.jsx)("h1", { children: "Have some fun, Play tic-tac-toe!" }), (0, jsx_runtime_1.jsx)(Gameboard_tsx_1.default, {})] }) }));
}
exports.default = App;
