import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import createEngine, { DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { BodyWidget } from './BodyWidget';

const engine = createEngine();
// node 1

enum Types {
	string = "string",
	number = "number",
	boolean = "boolean",
	any = "any",
	id = "id",
}

type Property = {
	name: string;
	type: Types;
	linked?: boolean
}

type Table = {
	tableName: string;
	properties: Property[],
	position: {
		x: number, y: number
	}
}

const createTable = ({
	tableName,
	properties,
	position
}: Table) => {
	const node = new DefaultNodeModel({
		name: tableName,
		color: 'rgb(0,192,255)',
	});
	node.setPosition(position.x, position.y);
	for (const prop of properties) {
		node.addOutPort(prop.name)
	}
	return node;
}

const data: Table[] = [
	{
		tableName: "Student",
		properties: [
			{ name: "id", type: Types.string, linked: false },
			{ name: "name", type: Types.string, linked: false },
			{ name: "age", type: Types.number, linked: false },
			{ name: "address", type: Types.string, linked: false },
			{ name: "idNumber", type: Types.string, linked: false },
			{ name: "birthday", type: Types.string, linked: false },
		],
		position: {
			x: 30, y: 30
		}
	}, {
		tableName: "Lesson",
		properties: [
			{ name: "id", type: Types.string, linked: false },
			{ name: "name", type: Types.string, linked: false },
			{ name: "age", type: Types.number, linked: false },
			{ name: "address", type: Types.string, linked: false },
			{ name: "idNumber", type: Types.string, linked: false },
			{ name: "birthday", type: Types.string, linked: false },
		],
		position: {
			x: 200, y: 30
		}
	}
]

// const link = port1.link<DefaultLinkModel>(port2);
// link.addLabel('Hello World!');

const db = data.map(tb => createTable(tb));

const link = db[0].getPort("id").createLinkModel()

const model = new DiagramModel();
model.addAll(...db);

engine.setModel(model);

document.addEventListener('DOMContentLoaded', () => {
	const root = createRoot(document.querySelector('#application'));
	root.render(<BodyWidget engine={engine} />);
});
