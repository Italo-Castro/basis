package com.basis.teste.controller;


import com.basis.teste.model.Pessoa.DadosAtualizarPessoaDTO;
import com.basis.teste.model.Pessoa.DadosNovaPessoaDTO;
import com.basis.teste.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    PessoaService service;


    @PostMapping
    public ResponseEntity save(@RequestBody DadosNovaPessoaDTO dados, UriComponentsBuilder uri) throws Exception {
        var pessoa = service.save(dados);
        var url = uri.path("/pessoa/${id}").buildAndExpand(pessoa.getId()).toUri();
        return ResponseEntity.created(url).body(pessoa);
    }


    @GetMapping
    public ResponseEntity findAll(){
        return ResponseEntity.ok( service.findAll());
    }

    @GetMapping("/findByNome/{nome}")
    public ResponseEntity findAll(@PathVariable String nome){
        return ResponseEntity.ok( service.findByName(nome));
    }

    @GetMapping("/{id}")
    public  ResponseEntity findByNome(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.ok(true);
    }


    @PutMapping
    public ResponseEntity atualizar(@RequestBody DadosAtualizarPessoaDTO dados) {
        return  ResponseEntity.ok(service.atualizar(dados));
    }


}
