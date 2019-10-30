<?php

namespace App\DataFixtures;

use App\Entity\Unavailability;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class UnavailabilityFixtures extends Fixture  implements DependentFixtureInterface
{
    private $faker;

    public function __construct() {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager)
    {
        for ($i=0; $i < 20; $i++) {
            $start = $this->faker->dateTimeBetween('now', '+1 month');
            $end = $this->faker->dateTimeBetween($start, $start->format('Y-m-d H:i:s').' +1 days');
            $unavailability = new Unavailability();
            $unavailability->setStaff($this->getReference('user'.rand(1,5)));
            $unavailability->setStart($start);
            $unavailability->setEnd($end);

            $manager->persist($unavailability);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
