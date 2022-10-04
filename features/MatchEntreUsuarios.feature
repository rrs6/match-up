Feature: Matches entre usuarios.
    Como usuario, eu posso me conectar a um usuario que me curtiu e que eu o curti.

Scenario: Match entre usuarios
    Given  Eu sou o usuario do sistema, cadastrado com o email "joao123@gmail.com" e senha "123456"
    And    os meus filtros escolhidos foram: games, cinema e gardening
    And    Gender = "Male"
    And    Existe um usuario do sistema, cadastrado com email "maria123@gmail.com" e senha "123456"
    And    os meus filtros escolhidos foram: games, cinema e gardening
    And    Gender = "Female"
    And    que curtiu o usuario "joao123@gmail.com".
    When   O usuario "joao123@gmail.com" curte o usuario "maria123@gmail.com"
    And    Eu clico no menu na opção Chat
    Then   Eu consigo ver que existe um chat entre o usuario "joao123@gmail.com" e "maria123@gmail.com".
