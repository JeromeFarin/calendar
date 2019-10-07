<?php

namespace App\DataFixtures;

use App\Entity\Prestation;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
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

        for ($i=0; $i < 5; $i++) {
            $user = new User();

            $user->setEmail($this->faker->email);
            $user->setPassword($this->encoder->encodePassword($user, 'password'));
            $user->setPseudo($this->faker->firstName);
            $user->setColor($this->faker->rgbcolor);

            $manager->persist($user);
        }

        for ($i=0; $i < 10; $i++) { 
            $prestation = new Prestation();

            $prestation->setName('Prestation '.$i);
            $prestation->setTimeMaking((new \DateTime())->setTime(0,$this->faker->randomElement([10,15,20,30,40,45,50,60])));
            $prestation->setPriceHt($this->faker->randomFloat(4,1,100));

            $manager->persist($prestation);
        }

        $manager->flush();
    }
}
