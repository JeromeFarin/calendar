<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $faker;
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder) {
        $this->encoder = $encoder;
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();

        $user->setEmail('test@test.fr');
        $user->setPassword($this->encoder->encodePassword($user, 'password'));
        $user->setPseudo($this->faker->firstName);
        $user->setColor($this->faker->rgbcolor);

        $manager->persist($user);
        $this->addReference('user5', $user);

        for ($i=0; $i < 5; $i++) {
            $user = new User();

            $user->setEmail($this->faker->email);
            $user->setPassword($this->encoder->encodePassword($user, 'password'));
            $user->setPseudo($this->faker->firstName);
            $user->setColor($this->faker->rgbcolor);

            $manager->persist($user);
            $this->addReference('user'.$i, $user);
        }

        $manager->flush();
    }
}
