<?php

namespace App\DataFixtures;

use App\Entity\Prestation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PrestationFixtures extends Fixture
{
    private $faker;

    public function __construct(UserPasswordEncoderInterface $encoder) {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager)
    {
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
