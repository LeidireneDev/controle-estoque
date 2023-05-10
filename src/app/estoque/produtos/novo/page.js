import * as produtos from "@/back-end/produtos";
import { MoneyInput } from "@/components/MoneyInput";
import Link from "next/link";
import { redirect } from "next/navigation";

async function salvarProduto(formData) {
  "use server";

  const dados = Object.fromEntries(formData);

  const resultado = await produtos.cadastrar(dados);

  if ("erros" in resultado) {
    const erros = JSON.stringify(resultado.erros);
    const dadosString = JSON.stringify(dados);

    return redirect(
      `/estoque/produtos/novo?erros=${erros}&dados=${dadosString}`
    );
  }

  redirect("/estoque/produtos");
}

function NovoProduto({ searchParams }) {
  const dados = !!searchParams?.dados && JSON.parse(searchParams.dados);
  const erros = !!searchParams?.erros && JSON.parse(searchParams.erros);

  return (
    <form action={salvarProduto}>
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Novo Produto
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Cadastre um novo produto
        </p>

        <div className="pb-12 border-b border-gray-900/10">
          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  required
                  defaultValue={dados?.nome}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${
                    erros.nome ? " border-red-600" : ""
                  }`}
                />
              </div>
              {erros.nome && (
                <p className="mt-1 text-xs text-red-600">{erros.nome}</p>
              )}
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="descricao"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descrição
              </label>
              <div className="mt-2">
                <textarea
                  id="descricao"
                  name="descricao"
                  type="text"
                  rows="3"
                  defaultValue={dados?.descricao}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="fornecedor"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fornecedor
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fornecedor"
                  id="fornecedor"
                  defaultValue={dados?.fornecedor}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <MoneyInput
                name="preco"
                label="Preço"
                defaultValue={dados?.preco}
                hasError={!!erros.preco}
                required
              />
              {erros.preco && (
                <p className="mt-1 text-xs text-red-600">{erros.preco}</p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="quantidade"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantidade
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="quantidade"
                  id="quantidade"
                  defaultValue={dados?.quantidade}
                  required
                  min="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 sm:px-0">
          <div className="flex items-center justify-end mt-6 gap-x-6">
            <Link href="/estoque/produtos">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NovoProduto;
