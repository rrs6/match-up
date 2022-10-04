Feature: Informações do Usuario.
    Como usuario recém cadastrado, eu preciso preencher os campos que contem informações mais detalhadas
    (Firstname, Lastname, Address, Age, Gender, Tags, Phone number).

Scenario: Adicionando informações a um usuario cadastrado recentemente
    Given  Eu sou o usuario do sistema, cadastrado com o email "rafael123@gmail.com" e senha "123456"
    And    Nos campos referentes as informações: Firstname, Lastname, Address, Phone number, Age, Gender
    e Tags não foram preenchidos.
    When   Clico no Menu.
    And    Clico em Profile.
    And    Preencho os campos: Firstname = "Rafael, Lastname = "Silva", Address="Rua Estrada do Curado, 443", Phone number="981726352", Age="23" e Tags = "Futebol e Food".
    And    Clico em Save.
    Then   Vejo que o usuario está com os campos Firstname = "Rafael, Lastname = "Silva", Address="Rua Estrada do Curado, 443", Phone number="981726352", Age="23" e Tags = "Futebol e Food"