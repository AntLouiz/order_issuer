# Order Issuer

Construído utilizando: [Django Rest Framework](https://www.django-rest-framework.org/) + [React](https://pt-br.reactjs.org/)

Outras ferramentas utilizadas:
- [Pytest](https://docs.pytest.org/en/6.2.x/)
- [Webpack](https://webpack.js.org/)

Disponível em: [order-issuer.herokuapp.com](https://order-issuer.herokuapp.com)

## Descrição
Este projeto contém regras de negócios simples para a submissão de pedidos.

O sistema permite com que:

- Você se identifique como um dos personagens listados
- Adicione itens à sacola.
- Sugira um preço de um item
- Visualize a sacola
- Altere itens da sacola
- Remova itens da sacola
- Submeta itens da sacola
- Visualize pedidos submetidos

Ao sugerir um preço de um item, será feito uma validação de rentabilidade, que consiste nas seguintes regras:
- Rentabilidade ótima: quando o preço usado no pedido é maior que o preço do produto. Ex: se o preço do produto é de R$ 100, a rentabilidade será ótima se o item for​ ​vendido​ ​por​ ​R$​ ​100,01​ ​(inclusive)​ ​ou​ ​mais.
- Rentabilidade boa: quando o preço do item é no máximo 10% menor que o preço do produto. Ex: se o preço do produto é de R$ 100, a rentabilidade será boa se o item for vendido​ ​por​ ​qualquer​ ​preço​ ​entre​ ​R$​ ​90​ ​(inclusive)​ ​e​ ​R$​ ​100​ ​(inclusive).
- Rentabilidade ruim: quando o preço do item é inferior ao preço do produto menos 10%. Ex: se o preço do produto é de R$ 100, a rentabilidade será ruim se o preço for menor​ ​ou​ ​igual​ ​a​ ​R$​ ​89,99.

Alguns produtos só podem ser vendidos em quantidades múltiplas de um determinado número. Por exemplo, o produto X-Wing só pode ser vendido em múltiplos de 2, por exemplo, 2, 4, 6, 8, etc. Já o produto Lightsaber só pode ser vendido em múltiplos de 5, ou seja, 5, 10, 15, 20 e assim por diante. Produtos que não possuem múltiplos podem ser vendidos​ ​em​ ​qualquer​ ​quantidade.

## Como rodar localmente
Faça o clone do projeto utilizando o comando, após isso crie um ambiente virtual para o projeto.

Você deverá fazer uma cópia do arquivo `example.env` mudando o nome da cópia para `.env`. Agora dentro dele, altere os valores das variáveis conforme necessário.

Depois disso, todos os arquivos desse repositório estarão dentro do diretório que você criou antes e executou o comando anterior. Agora nós precisamos instalar as dependências Python do projeto. Para isso, você pode executar esse comando abaixo:

```bash
$ make install-requirements
```

Se em algum momento você quiser atualizar os pacotes Python, execute o seguinte:

```bash
$ make update-requirements
```

Agora vamos instalar as dependências do frontend:

```bash
$ make setup-frontend
```

Crie os dados iniciais do sistema:

```bash
$ make setup-data
```

Por fim, inicie o servidor:

```bash
$ python manage.py runserver
```

Rodando os testes:
------------------

Pra rodar os testes vai ser tão simples quanto o seguinte:

```bash
$ pytest
```
