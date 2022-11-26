import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import Notfound from "../Routes/404.jsx";

test('El componente renderizado tiene la classe notFound', async () => {
  render(<Notfound />);


  const notFound = await screen.findAllByText(/404 - Ruta no trobada/i);

  expect(notFound[0]).toHaveClass('notFound');
});
test('El componente renderizat te el text 404 - Not Found', async () => {
  render(<Notfound />);


  const notFound = await screen.findAllByText(/404 - Ruta no trobada/i);
  expect(notFound[0]).toBeInTheDocument("404 - Ruta no trobada");
});