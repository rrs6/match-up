Feature: Listagem de usuarios com gostos em comum.
    Como usuario, preciso ver a lista de usuarios que tem gostos similares ao meu.

Scenario: Exibindo a lista de usuario com gostos em comum
    Given  Eu sou o usuario do sistema, cadastrado com o email "joao123@gmail.com" e senha "123456"
    And    os meus filtros escolhidos foram: games, cinema e gardening,
    When   Eu vou para a tela que mostra a listagem de usuarios com base no gostos
    Then   Vejo "Ana Maria", que tem filtros: games e cinema
    And    Vejo "João Vynnyccius", que tem filtros: games, cinema, futebol e gardening
    And    Não vejo "Maria Clara", que tem filtros: games, cinema and futebol
