Feature: Informações do Usuario.
    Como usuario, é necessário que eu consiga modificar algumas informações referente ao meu usuário como:
    Username, Primeiro nome, Ultimo nome, Endereço, Telephone, Idade, Gênero e Tags.

Scenario: Modificando o campo 'Address'
    Given  Eu sou o usuario do sistema, cadastrado com o email "maria123@gmail.com" e senha "123456"
    And    Em minha informações eu consigo ver os seguintes campos e valores: DisplayName = "Maria",
    Firstname = "Maria", Lastname = "Silva", Address = "Rua Dom Pedro II, 28", Age = "23" e Gender = "Female"
    e Tags = "Futebol, Games e Food".
    When   Modifico o campo Address para "Avenida Irajara, 28"
    And    Clico em Save.
    Then   Vejo que agora todas informações permanecem exceto Address que é "Avenida Irajara, 28".
