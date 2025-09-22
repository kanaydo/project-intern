// Component/Element => HomePage

import { ClientComponent } from "@/components/ClientComponent";
import Link from "next/link";
import { ReactNode } from "react";

// javascript => superset => typescript
// functional programming secara default

// primitive function
function FunctionComponent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-green-600 p-4">Functional Component {children}</div>
  );
}

// arrow function // lambda // anonymous function
// props => properties,  primitive data types: number string, date, dll, component
// reusable component
type ArrowFunctionProps = {
  name: string;
  color?: string;
};
const ArrowFunction = ({ name, color }: ArrowFunctionProps) => {
  return <div style={{ color: color }}>Arrow Function: {name}</div>;
}; // memory footprint

export default function HomePage() {
  return (
    <div>
      <FunctionComponent>
        <ArrowFunction name="Tara" color="#ff0000" />
      </FunctionComponent>
      <ArrowFunction name="Samuel" />
      <ArrowFunction name="Bayu" />
      <ArrowFunction name="Sakti" color="#0000ff" />
      <Link href="/about">Ke Halaman About</Link>
      <ClientComponent />
    </div>
  );
}
