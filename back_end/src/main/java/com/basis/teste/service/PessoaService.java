package com.basis.teste.service;


import com.basis.teste.Respository.EnderecoPessoaRepository;
import com.basis.teste.Respository.EnderecoRepository;
import com.basis.teste.Respository.ListaPessoaViewRepository;
import com.basis.teste.Respository.PessoaRepository;

import com.basis.teste.model.Endereco.Endereco;
import com.basis.teste.model.EnderecoPessoa.EnderecoPessoa;
import com.basis.teste.model.Pessoa.DadosAtualizarPessoaDTO;
import com.basis.teste.model.Pessoa.DadosNovaPessoaDTO;
import com.basis.teste.model.ViewPessoa.EnderecoDTO;
import com.basis.teste.model.ViewPessoa.ListaPessoaDTO;
import com.basis.teste.model.ViewPessoa.ListaPessoasView;
import com.basis.teste.model.Pessoa.Pessoa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DaoSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    PessoaRepository repository;

    @Autowired
    ListaPessoaViewRepository listaPessoaViewRepository;

    @Autowired
    EnderecoRepository enderecoRepository;


    @Autowired
    EnderecoPessoaRepository enderecoPessoaRepository;


    @Transactional
    public Pessoa atualizar(DadosAtualizarPessoaDTO dados)  {
        var pessoa = repository.getReferenceById(dados.id());
        pessoa = repository.save(pessoa);

      /*  for (int x = 0; x < dados.dadosNovoEndereco().size(); x++) {
            var endereco = new Endereco(dados.dadosNovoEndereco().get(x));
            endereco = enderecoRepository.save(endereco);
            var enderecoPessoa = new EnderecoPessoa(endereco, pessoa);
            enderecoPessoaRepository.save(enderecoPessoa);
        }*/

        return pessoa;
    }

    @Transactional
    public Pessoa save(DadosNovaPessoaDTO dados) throws Exception {

        if (dados.tipoPessoa() == 0) {
            if (dados.nome().isEmpty()) {
                 throw new IllegalArgumentException("Dados inválidos");
            }
        }


        var pessoa = new Pessoa(dados);
        pessoa = repository.save(pessoa);

        for (int x = 0; x < dados.dadosNovoEndereco().size(); x++) {
            var endereco = new Endereco(dados.dadosNovoEndereco().get(x));
            endereco = enderecoRepository.save(endereco);
            var enderecoPessoa = new EnderecoPessoa(endereco, pessoa);
            enderecoPessoaRepository.save(enderecoPessoa);
        }

        return pessoa;
    }


    public List<ListaPessoaDTO> findAll() {
        var vw = listaPessoaViewRepository.findAll();
        List<Integer> idAdicionado = new ArrayList<>();
        List<ListaPessoaDTO> lista = new ArrayList<>();


        for (int x = 0; x < vw.size(); x++) {
            var view = vw.get(x);

            if (!idAdicionado.contains(view.getId())) {
                var dadosPessoa = new ListaPessoaDTO(view.getId(), view.getEmail(), view.getContato(), view.getTipo_pessoa(), view.getNome(), view.getDocumento(), view.getEndereco_comercial(), view.getEndereco_residencial());
                lista.add(dadosPessoa);
                idAdicionado.add(view.getId());

            } else {
                var index = idAdicionado.indexOf(view.getId());
                if (index != -1) {
                    if (!(view.getEndereco_comercial().isEmpty())) {
                        lista.get(index).setEnderecoComercial(view.getEndereco_comercial());
                    }
                    if (!(view.getEndereco_residencial().isEmpty())) {
                        lista.get(index).setEnderecoResidencial(view.getEndereco_residencial());
                    }
                }
            }
        }


        return lista;
    }

    public Pessoa getById(Long id) {
        return repository.getPessoaById(id);
    }

    public void excluir(Long id) {
        var pessoa = repository.getReferenceById(id);
        repository.delete(pessoa);
    }

    public List<ListaPessoaDTO> findByName(String nome) {
        var vw = listaPessoaViewRepository.findAll();
        List<Integer> idAdicionado = new ArrayList<>();
        List<ListaPessoaDTO> lista = new ArrayList<>();


        for (int x = 0; x < vw.size(); x++) {
            if (vw.get(x).getNome().equals(nome)) {


                var view = vw.get(x);

                if (!idAdicionado.contains(view.getId())) {
                    var dadosPessoa = new ListaPessoaDTO(view.getId(), view.getEmail(), view.getContato(), view.getTipo_pessoa(), view.getNome(), view.getDocumento(), view.getEndereco_comercial(), view.getEndereco_residencial());
                    lista.add(dadosPessoa);
                    idAdicionado.add(view.getId());

                } else {
                    var index = idAdicionado.indexOf(view.getId());
                    if (index != -1) {
                        if (!(view.getEndereco_comercial().isEmpty())) {
                            lista.get(index).setEnderecoComercial(view.getEndereco_comercial());
                        }
                        if (!(view.getEndereco_residencial().isEmpty())) {
                            lista.get(index).setEnderecoResidencial(view.getEndereco_residencial());
                        }
                    }
                }
            }
        }


        return lista;
    }

}
