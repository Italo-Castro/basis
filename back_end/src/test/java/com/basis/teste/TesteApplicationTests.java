package com.basis.teste;

import com.basis.teste.Respository.EnderecoRepository;
import com.basis.teste.Respository.PessoaRepository;
import com.basis.teste.controller.PessoaController;
import com.basis.teste.model.Endereco.DadosNovoEnderecoDTO;
import com.basis.teste.model.Endereco.Endereco;
import com.basis.teste.model.Pessoa.DadosNovaPessoaDTO;
import com.basis.teste.model.Pessoa.Pessoa;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootTest
class TesteApplicationTests {


    @Autowired
    PessoaRepository repository;

    @Autowired
    EnderecoRepository enderecoRepository;

    @Autowired
    PessoaController controller;

    @Test
    void testaCadastroPessoaRepository() {
        Pessoa p = new Pessoa();
        p.setCpf("000000000");
        p = repository.save(p);
        Assertions.assertThat(p.getId()).isNotNull();
        Assertions.assertThat(p.getCpf()).isEqualTo("000000000");
    }


    @Test
    void testaCpfRetornoCadastroPessoa() {
        Endereco endereco = new Endereco();
        endereco.setCep("35570280");
        endereco = enderecoRepository.save(endereco);
        Assertions.assertThat(endereco.getId()).isNotNull();
        Assertions.assertThat(endereco.getCep()).isEqualTo("35570280");
    }

    @Test
    void testaCadastroEndereco() {
        Pessoa p = new Pessoa();
        p.setCpf("000000000");
        p = repository.save(p);
        Assertions.assertThat(p.getId()).isNotNull();
        Assertions.assertThat(p.getCpf()).isEqualTo("000000000");
    }


    //teste de integração com o controller
    @Test
    void testarBuscaCompleta() {
        ResponseEntity response = controller.findAll();
        Assertions.assertThat(response.getStatusCode()).as("200 OK");
        Assertions.assertThat(response.getBody()).asList();
    }


    @Test
    void testarCadastroPessoaController() throws Exception {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString("http://localhost:5200");
        DadosNovoEnderecoDTO dadosNovoEndereco = new DadosNovoEnderecoDTO(
                "",
                0,
                "bairro",
                "complemento",
                "cidade",
                "cep",
                "uf",
                0);
        List<DadosNovoEnderecoDTO> listaEndereco = new ArrayList<>();
        listaEndereco.add(dadosNovoEndereco);

        DadosNovaPessoaDTO dadosNovaPessoa =  new DadosNovaPessoaDTO("37", "998089731", "jose@gmail.com", 1, "04245778145", "", "", "Jose Comrporatio", listaEndereco);
        ResponseEntity response = controller.save(dadosNovaPessoa, uriBuilder);

        Assertions.assertThat(response.getStatusCode()).as("200 OK");
        Assertions.assertThat(response.getBody()).isNotNull();
    }


}
