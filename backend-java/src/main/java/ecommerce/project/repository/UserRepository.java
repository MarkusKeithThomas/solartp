package ecommerce.project.repository;


import ecommerce.project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByRefreshToken(String refreshtoken);
    List<UserEntity> findByRole_NameIn(List<String> roleNames);}
