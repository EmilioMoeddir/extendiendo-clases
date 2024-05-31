import * as products from "./products.json";
import * as fs from "fs";
import { remove } from "lodash";
import { orderBy } from "lodash";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    // Llamada al constructor de la superclase: LisaDeCosas
    super(name);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    const productsJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productsParseado = JSON.parse(productsJson);

    productsParseado.forEach((element) => {
      this.addProduct(element);
    });
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    this.add(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    const cosas = this.getCosas();
    return cosas.find((elementos) => elementos.id == id);
  }

  removeProduct(id: number): Product {
    // Implementación del método removeProduct
    const obj = remove(this.cosas, (elementos) => elementos.id === id)[0];
    return obj;
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}
export { ListaDeProductos, Product };
