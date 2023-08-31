package com.basis.teste.Respository;

import com.basis.teste.model.Pessoa.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa,Long> {

    @Query(value = "EXEC findById :id", nativeQuery = true)
    Pessoa getPessoaById(Long id);

    @Query(value = "select *from pessoa where nome = :nome", nativeQuery = true)
    List<Pessoa> findByNome(String nome);

}
